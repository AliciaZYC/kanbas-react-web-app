import { FaCalendarAlt } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import * as db from "../../Database"; // Assuming this is your assignments database

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find(
    (assignment) => assignment._id === aid && assignment.course === cid
  );

  return (
    <div id="wd-assignments-editor" className="me-4">
      <label htmlFor="wd-name" className="form-label">
        Assignment Name
      </label>

      <input id="wd-name" className="form-control" value={assignment?.title} />
      <br />
      <div className="form-control">
        The assignment is <span className="text-danger">available online</span>
        <br />
        <br />
        Submit a link to the landing page of your Web application running on
        Netlify.
        <br />
        <br />
        The landing page should include the following:
        <ul>
          <li>Your full name and section</li>
          <li>Links to each of the lab assignments</li>
          <li>Link to the Kanbas application</li>
          <li>Links to all relevant source code repositories</li>
        </ul>
        The Kanbas application should include a link to navigate back to the
        landing page.
      </div>
      <br />

      <div>
        <div className="mb-3 row">
          <label
            htmlFor="wd-points"
            className="col-sm-2 col-form-label text-end"
          >
            Points
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="wd-points"
              value={100}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label
            htmlFor="wd-group"
            className="col-sm-2 col-form-label text-end"
          >
            Assignment Group
          </label>
          <div className="col-sm-10">
            <select id="wd-group" className="form-select">
              <option value="ASSIGNMENTS" selected>
                ASSIGNMENTS
              </option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </div>
        </div>

        <div className="mb-3 row">
          <label
            htmlFor="wd-display-grade-as"
            className="col-sm-2 col-form-label text-end"
          >
            Display Grade as
          </label>
          <div className="col-sm-10">
            <select id="wd-display-grade-as" className="form-select">
              <option value="Letter">Letter</option>
              <option value="Percentage" selected>
                Percentage
              </option>
              <option value="GPA">GPA</option>
            </select>
          </div>
        </div>

        <div className="mb-3 row">
          <label
            htmlFor="wd-submission-type"
            className="col-sm-2 col-form-label text-end"
          >
            Submission Type
          </label>
          <div className="col-sm-10">
            <div className="form-control">
              <select id="wd-submission-type" className="form-select">
                <option value="InPerson">In-person</option>
                <option value="Online" selected>
                  Online
                </option>
              </select>
              <label className="my-3 fs-6">
                <strong>Online Entry Options </strong>
              </label>
              <div className="col-sm-10">
                <div className="form-check my-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-text-entry"
                  />
                  <label className="form-check-label" htmlFor="wd-text-entry">
                    Text Entry
                  </label>
                </div>
                <div className="form-check my-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-website-url"
                  />
                  <label className="form-check-label" htmlFor="wd-website-url">
                    Website URL
                  </label>
                </div>
                <div className="form-check my-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-media-recordings"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-media-recordings"
                  >
                    Media Recordings
                  </label>
                </div>
                <div className="form-check my-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-student-annotation"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="wd-student-annotation"
                  >
                    Student Annotation
                  </label>
                </div>
                <div className="form-check my-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="wd-file-upload"
                  />
                  <label className="form-check-label" htmlFor="wd-file-upload">
                    File Uploads
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 row">
          <label
            htmlFor="wd-assign-to"
            className="col-sm-2 col-form-label text-end"
          >
            Assign
          </label>
          <div className="col-sm-10">
            <div className="form-control">
              <label className="mt-3 fs-6">
                <strong>Assign to</strong>
              </label>
              <input
                type="text"
                className="form-control"
                id="wd-points"
                value="Everyone"
              />
              <label className="mt-3 fs-6">
                <strong>Due</strong>
              </label>
              <div className="input-group">
                <input
                  type="datetime-local"
                  id="wd-due-date"
                  className="form-control"
                  value="2024-05-13T23:59"
                />
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
              </div>
              <div className="wd-date-inputs row">
                <label className="mt-3 fs-6 col">
                  <strong>Available from</strong>
                </label>
                <label className="mt-3 fs-6 col">
                  <strong>Until</strong>
                </label>
              </div>
              <div className="container mb-3">
                <div className="wd-date-inputs row">
                  <div className="col">
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        id="wd-available-from"
                        className="form-control"
                        value="2024-05-06T23:59"
                      />
                      <span className="input-group-text">
                        <FaCalendarAlt />
                      </span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="input-group">
                      <input
                        type="datetime-local"
                        id="wd-available-until"
                        className="form-control"
                        value="2024-05-20T23:59"
                      />
                      <span className="input-group-text">
                        <FaCalendarAlt />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="d-flex justify-content-end">
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          className="btn btn-secondary me-2"
        >
          Cancel
        </Link>
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          className="btn btn-danger"
        >
          Save
        </Link>
      </div>
    </div>
  );
}
