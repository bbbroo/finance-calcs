import React, { useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Label,
  ResponsiveContainer,
} from "recharts";

let datas = new Array(30).fill({ name: "", Value: 0 });
let initial = true;

const CompoundInt = () => {
  let [valuePerYear, setValuePerYear] = useState(datas);
  const [curPrin, setCurPrin] = useState("");
  const [annAdd, setAnnAdd] = useState("");
  const [yearsGrow, setYearsGrow] = useState("");
  const [intRate, setIntRate] = useState("");
  const [compFreq, setCompFreq] = useState("");
  const [compTime, setCompTime] = useState("Start");
  const [fv, setFV] = useState("");

  const handleChange = (event) => {
    const freq = Number(compFreq);
    const principle = Number(curPrin);
    const additions = Number(annAdd) / freq;
    const years = Number(yearsGrow);
    const times = years * freq;
    const rate = Number(intRate) / 100;
    const z = 1 + rate / freq;
    const futureValueA =
      principle * z ** times + additions * ((z ** (times + 1) - z) / (z - 1));
    const futureValueB =
      principle * z ** times + additions * ((z ** times - 1) / rate);
    setFV(
      compTime == "Start"
        ? `$${Number(futureValueA.toFixed(2)).toLocaleString()}`
        : `$${Number(futureValueB.toFixed(2)).toLocaleString()}`
    );

    const yearsTotal = [];
    valuePerYear = [];
    let newval = 0;
    for (let i = 1; i <= years; i++) {
      if (compTime === "Start") {
        newval =
          principle * z ** i + additions * ((z ** (i + 1) - z) / (z - 1));
      } else {
        newval = principle * z ** i + additions * ((z ** i - 1) / rate);
      }
      valuePerYear.push({ name: i, Value: Number(newval.toFixed(2)) });
    }
    setValuePerYear(valuePerYear);
    initial = false;
  };

  const GradientColors = () => {
    return (
      <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
        <stop offset="30%" stopColor="#8884d8" stopOpacity={0.4} />
        <stop offset="75%" stopColor="#ff9bff81" stopOpacity={0.3} />
        === ADD MORE COLOURS HERE ===
        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.2} />
      </linearGradient>
    );
  };

  return (
    <div>
      <h1>Compound Interest Calculator</h1>
      <form className="form" action="" method="post">
        <div className="inline p-2">
          <p className="m-0">Current Principle</p>
          <CurrencyInput
            id="input-example"
            name="input-name"
            value={curPrin}
            decimalsLimit={2}
            prefix="$"
            allowNegativeValue="false"
            onValueChange={(value) => setCurPrin(value)}
          />
        </div>
        <div className="inline p-2">
          <p className="m-0">Annual Addition</p>
          <CurrencyInput
            id="input-example"
            name="input-name"
            value={annAdd}
            decimalsLimit={2}
            prefix="$"
            allowNegativeValue="false"
            onValueChange={(value) => setAnnAdd(value)}
          />
        </div>
        <div className="inline p-2">
          <p className="m-0">Years To Grow</p>
          <input
            type="text"
            name=""
            value={yearsGrow}
            onChange={(ev) => setYearsGrow(ev.target.value)}
          />
        </div>
        <div className="inline p-2">
          <p className="m-0">Interest Rate</p>
          <CurrencyInput
            id="input-example"
            name="input-name"
            value={intRate}
            suffix="%"
            allowNegativeValue="false"
            onValueChange={(value) => setIntRate(value)}
          />
        </div>
        <div className="inline p-2">
          <p className="m-0">Compound Frequency Per Year</p>
          <input
            type="text"
            name=""
            value={compFreq}
            onChange={(ev) => setCompFreq(ev.target.value)}
          />
        </div>
        <div className="inline p-2">
          <p className="m-0">Additions Made At</p>
          <fieldset id="compound-time">
            <input
              className="comp-time"
              type="radio"
              name="compound-time"
              value="Start"
              defaultChecked
              onChange={(ev) => setCompTime(ev.target.value)}
            />
            Start
            <div className="d-flex">
            <input
              className="comp-time"
              type="radio"
              name="compound-time"
              value="End"
              onChange={(ev) => setCompTime(ev.target.value)}
            />
            <span className="d-flex text-align-right">End of Compounding Period</span> 
            </div>
            
          </fieldset>
        </div>
        <div className="button inline p-2">
          <input
            id="submitbtn"
            type="button"
            value="Submit"
            onClick={handleChange}
          />
        </div>
        <div className="inline p-2 final-value">
          <h5>Future Value</h5>
          <input
            className="m-3 height-up"
            type="text"
            value={fv}
            onChange={(ev) => setFV(ev.target.value)}
            readOnly
          />
        </div>
      </form>
      {!initial && (
        <div className="d-flex justify-content-center align-items-center m-auto mb-4 chartwidth">
          <ResponsiveContainer width="95%" height={400} max-width={"300px"}>
            <AreaChart width={600} height={300} data={valuePerYear}>
              <defs>
                <GradientColors />
              </defs>
              <XAxis dataKey="name" stroke="#8884d8">
                <Label
                  value="Years"
                  position="top"
                  fontSize={18}
                  fill="#8884d8"
                />
              </XAxis>
              <YAxis
                dataKey={"Value"}
                stroke="#8884d8"
                width={60}
                tickCount={20}
                tickFormatter={(value) =>
                  `$${new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)}`
                }
              >
                <Label />
              </YAxis>
              <Tooltip
                wrapperStyle={{ width: 170 }}
                itemStyle={{ color: "#17181f" }}
                contentStyle={{
                  color: "#17181f",
                  backgroundColor: "#ccc",
                  borderRadius: "30px",
                  opacity: 0.9,
                }}
                labelFormatter={(name) => "Year: " + name}
                formatter={(value) =>
                  `$${new Intl.NumberFormat("en").format(value)}`
                }
              />
              <Area
                dataKey="Value"
                type="monotone"
                stroke="#8884d8"
                strokeWidth={3}
                strokeOpacity={1}
                arSize={30}
                fill="url(#colorView)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CompoundInt;
