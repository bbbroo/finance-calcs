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
  ResponsiveContainer
} from "recharts";

let initial = true;

function Mortgage() {
  const [loanAmt, setLoanAmt] = useState("");
  const [mortRate, setMortRate] = useState("");
  const [yearsPaid, setYearsPaid] = useState("");
  const [mp, setMP] = useState("");
  const [tp, setTP] = useState("");
  let [amtLeft, setAmtLeft] = useState("");
  let [equity, setEquity] = useState("");

  const handleChange = (event) => {
    const amount = Number(loanAmt);
    const rate = Number(mortRate) / 12;
    const actRate = rate / 100;
    const len = Number(yearsPaid);
    const acLen = len * 12;
    const z = 1 + actRate;

    const payAmt =
      (amount * (1 + actRate) ** acLen * actRate) /
      ((1 + actRate) ** acLen - 1);
    const totalPayAmt = payAmt * acLen;
    setMP(`$${Number(payAmt.toFixed(2)).toLocaleString()}`);
    setTP(`$${Number(totalPayAmt.toFixed(2)).toLocaleString()}`);

    const yearsTotal = [];
    amtLeft = [];
    let newval = 0;
    let equity1 = 0;
    for (let i = 0; i <= acLen; i++) {
      // newval = ((amount*(actRate)*acLen)/(1-((1+(actRate))**(-acLen)))) - (payAmt*i*12);
      if (i % 12 == 0) {
        newval = Number(
          (amount * z ** i - (payAmt * (z ** i - 1)) / (z - 1)).toFixed(2)
        );
        equity1 = amount - newval;
        amtLeft.push({ name: i / 12, Debt: newval, Equity: equity1 });
      }
    }
    setAmtLeft(amtLeft);
    // equity = amtLeft.map(item => amount - item["Value"])
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
      <h1>Mortgage Payment Calculator</h1>
      <form className="form" action="" method="post">
        <div className="inline p-2">
          <p className="m-0">Loan Amount</p>
          <CurrencyInput
            id="input-example"
            name="input-name"
            value={loanAmt}
            decimalsLimit={2}
            prefix="$"
            allowNegativeValue="false"
            onValueChange={(value) => setLoanAmt(value)}
          />
        </div>
        <div className="inline p-2">
          <p className="m-0">Mortgage Rate</p>
          <CurrencyInput
            id="input-example"
            name="input-name"
            value={mortRate}
            suffix="%"
            allowNegativeValue="false"
            onValueChange={(value) => setMortRate(value)}
          />
        </div>
        <div className="inline p-2">
          <p className="m-0">Years To Pay</p>
          <input
            type="text"
            name=""
            value={yearsPaid}
            onChange={(ev) => setYearsPaid(ev.target.value)}
          />
        </div>
        <div className="mb-1 button inline p-2">
          <input
            id="submitbtn"
            type="button"
            value="Submit"
            onClick={handleChange}
          />
        </div>
        <div className="inline p-2 final-value">
          <h5>Monthly Payments</h5>
          <input
            className="mt-1 mb-1 ml-10 height-up"
            type="text"
            value={mp}
            onChange={(ev) => setMP(ev.target.value)}
            readOnly
          />
        </div>
        <div className="inline p-2 final-value">
          <h5>Total Payments</h5>
          <input
            className="mt-1 mb-1 ml-10 height-up"
            type="text"
            value={tp}
            onChange={(ev) => setTP(ev.target.value)}
            readOnly
          />
        </div>
      </form>
      {!initial && (
        <div className="d-flex justify-content-center align-items-center m-auto mb-4 chartwidth">
          <ResponsiveContainer width="95%" height={400} max-width={"300px"}>
            <AreaChart width={600} height={300} data={amtLeft}>
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
                dataKey={"Debt"}
                stroke="#8884d8"
                width={60}
                tickCount={20}
                tickFormatter={(value) =>
                  `$${new Intl.NumberFormat("en-US", {
                    notation: "compact",
                    compactDisplay: "short",
                  }).format(value)}`
                }
              ></YAxis>
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
                dataKey="Debt"
                type="monotone"
                stroke="#8884d8"
                strokeWidth={3}
                strokeOpacity={1}
                arSize={30}
                fill="url(#colorView)"
              />
              <Area
                dataKey="Equity"
                type="monotone"
                stroke="#72A6A6"
                strokeWidth={3}
                strokeOpacity={1}
                arSize={30}
                fill="url(#colorView)"
              />
              <Legend
                iconSize={25}
                wrapperStyle={{ fontSize: "18px", paddingLeft: "60px" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default Mortgage;
