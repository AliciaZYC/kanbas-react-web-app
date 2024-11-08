import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  const [c, setC] = useState("6");
  const [d, setD] = useState("3");
  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <input
        id="wd-query-parameter-a"
        className="form-control mb-2"
        value={a}
        type="number"
        onChange={(e) => setA(e.target.value)}
      />
      <input
        id="wd-query-parameter-b"
        className="form-control mb-2"
        value={b}
        type="number"
        onChange={(e) => setB(e.target.value)}
      />
      <a
        className="btn btn-primary me-2"
        id="wd-query-parameter-add"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger me-2"
        id="wd-query-parameter-subtract"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Substract {a} - {b}
      </a>
      {/* create additional links to test multiply and divide. use IDs starting with wd-query-parameter- */}
      <hr />
      <input
        id="wd-query-parameter-c"
        className="form-control mb-2"
        value={c}
        type="number"
        onChange={(e) => setC(e.target.value)}
      />
      <input
        id="wd-query-parameter-d"
        className="form-control mb-2"
        value={d}
        type="number"
        onChange={(e) => setD(e.target.value)}
      />
      <a
        className="btn btn-primary me-2"
        id="wd-query-parameter-multiply"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${c}&b=${d}`}
      >
        Multiply {c} + {d}
      </a>
      <a
        className="btn btn-danger me-2"
        id="wd-query-parameter-divide"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${c}&b=${d}`}
      >
        Divide {c} / {d}
      </a>
      <hr />
    </div>
  );
}
