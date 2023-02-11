import React, { useState, useEffect } from "react";
import CurrencyInput from 'react-currency-input-field';


function Mortgage() {

  const [loanAmt, setLoanAmt] = useState("");
  const [mortRate, setMortRate] = useState("");
  const [yearsPaid, setYearsPaid] = useState("");
  const [mp, setMP] = useState("");

  const handleChange = (event) => {
    const amount = Number(loanAmt);
    const rate = (Number(mortRate)/12)/100;
    const len = Number(yearsPaid)*12;

    const payAmt = ((amount*((1+rate)**len)*rate)/(((1+rate)**len)-1));
    setMP(
      `$${Number(payAmt.toFixed(2)).toLocaleString()}`
    );

    // const yearsTotal = [];
    // valuePerYear = [];
    // let newval = 0;
    // for (let i = 1; i <= years; i++) {
    //   newval = principle * z ** i + additions * ((z ** (i + 1) - z) / (z - 1));
    //   valuePerYear.push({ name: i, Value: newval.toFixed(2) });
    // }
    // setValuePerYear(valuePerYear);
    // initial = false;
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
            value={mp}
            onChange={(ev) => setMP(ev.target.value)}
            readOnly
          />
        </div>
      </form>
    </div>
  );
}

export default Mortgage;
