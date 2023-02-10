import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const CompoundInt = () => {
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
    const additions = Number(annAdd)/freq;
    const years = Number(yearsGrow);
    const times = years*freq;
    const rate = Number(intRate);
    const z = 1 + (rate/freq);
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
    const valuePerYear = [];
    for (let i = 1; i <= years; i++) {
      yearsTotal.push(i);
      if (compTime === "Start") {
        valuePerYear.push(
          principle * z ** i + additions * ((z ** (i + 1) - z) / (z - 1))
        );
      } else {
        valuePerYear.push(
          principle * z ** i + additions * ((z ** i - 1) / rate)
        );
      }
    }
    console.log(yearsTotal);
    console.log(valuePerYear);
  };

  // const [state, setState] = useState({
  //   labels: ["$"],
  //   datasets: [
  //     {
  //       backgroundColor: "rgba(75,192,192,1)",
  //       borderColor: "rgba(0,0,0,1)",
  //       borderWidth: 2,
  //       data: [0],
  //     },
  //   ],
  // });

  // useEffect(() => {
  //   setState({
  //     labels: [state],
  //     datasets: [
  //       {
  //         backgroundColor: "rgba(75,192,192,1)",
  //         borderColor: "rgba(0,0,0,1)",
  //         borderWidth: 2,
  //         data: [state],
  //       },
  //     ],
  //   });
  // }, [fv]);

  return (
    <div>
      <h1>Compound Interest Calculator</h1>
      <form className="form" action="" method="post">
        <div className="inline p-2">
          <p className="m-0">Current Principle</p>
          <input
            type="text"
            name=""
            value={curPrin}
            onChange={(ev) => setCurPrin(ev.target.value)}
          />
        </div>
        <div className="inline p-2">
          <p className="m-0">Annual Addition</p>
          <input
            type="text"
            name=""
            value={annAdd}
            onChange={(ev) => setAnnAdd(ev.target.value)}
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
          <input
            type="text"
            name=""
            value={intRate}
            onChange={(ev) => setIntRate(ev.target.value)}
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
            <input
              className="comp-time"
              type="radio"
              name="compound-time"
              value="End"
              onChange={(ev) => setCompTime(ev.target.value)}
            />
            End of Compounding Period
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
      {/* <div>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "$ Per Year",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div> */}
    </div>
  );
};

export default CompoundInt;
