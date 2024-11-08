import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  const [c, setC] = useState("6");
  const [d, setD] = useState("3");
  return (
    <div>
      <h3>Path Parameters</h3>
      <input
        className="form-control mb-2"
        id="wd-path-parameter-a"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <input
        className="form-control mb-2"
        id="wd-path-parameter-b"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <a
        className="btn btn-primary me-2"
        id="wd-path-parameter-add"
        href={`${REMOTE_SERVER}/lab5/add/${a}/${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger"
        id="wd-path-parameter-subtract"
        href={`${REMOTE_SERVER}/lab5/subtract/${a}/${b}`}
      >
        Substract {a} - {b}
      </a>
      <hr />
      <input
        className="form-control mb-2"
        id="wd-path-parameter-c"
        type="number"
        value={c}
        onChange={(e) => setC(e.target.value)}
      />
      <input
        className="form-control mb-2"
        id="wd-path-parameter-d"
        type="number"
        value={d}
        onChange={(e) => setD(e.target.value)}
      />
      <a
        className="btn btn-primary me-2"
        id="wd-path-parameter-multiply"
        href={`${REMOTE_SERVER}/lab5/multiply/${c}/${d}`}
      >
        Multiply {c} * {d}
      </a>
      <a
        className="btn btn-danger"
        id="wd-path-parameter-divide"
        href={`${REMOTE_SERVER}/lab5/divide/${c}/${d}`}
      >
        Divide {c} / {d}
      </a>
      <hr />
    </div>
  );
}
