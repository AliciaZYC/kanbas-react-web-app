import {
  FaPlus,
  FaSearch,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments.filter(
    (assignment) => assignment.course === cid
  );

  return (
    <div id="wd-assignments" className="text-nowrap">
      <div className="d-flex mb-3">
        <div className="input-group me-2 w-50">
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
          <input
            id="wd-search-assignment"
            className="form-control form-control-lg"
            placeholder="Search..."
            aria-label="Search for Assignments"
          />
        </div>

        <button
          id="wd-add-assignment"
          className="btn btn-lg btn-danger me-1 ms-auto"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </button>
        <button
          id="wd-add-assignment-group"
          className="btn btn-lg btn-secondary me-1"
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Group
        </button>
      </div>

      <ul id="wd-assignments" className="list-group rounded-0">
        <li className="wd-assignments list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title d-flex align-items-center p-3 ps-2 bg-secondary">
            <div className="flex-grow-1">
              <BsGripVertical className="me-2 fs-3" />
              <span className="fw-bold">ASSIGNMENTS</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="bg-secondary text-dark px-3 py-1 rounded-pill border border-light me-2">
                40% of Total
              </span>
              <BsPlus className="fs-4" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ul id="wd-assignment-list" className="list-group rounded-0">
            {assignments.map((assignment) => (
              <li
                key={assignment._id}
                className="wd-assignment-list-item list-group-item p-3 ps-1"
              >
                <div className="row align-items-center">
                  <div className="col-auto">
                    <BsGripVertical className="me-2 fs-3" />
                  </div>
                  <div className="col-auto">
                    <FaClipboardList className="fs-3 text-success me-2" />
                  </div>
                  <div className="col">
                    <a
                      className="wd-assignment-link text-dark fw-bold fs-5 text-decoration-none"
                      href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      {assignment.title}
                    </a>
                    <p>
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <strong>Not available until</strong> May 6 at 12:00am |
                      <strong>Due</strong> May 13 at 11:59pm | 100 pts
                    </p>
                  </div>
                  <div className="col-auto">
                    <FaCheckCircle className="fs-3 text-success me-2" />
                    <IoEllipsisVertical className="fs-4" />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
