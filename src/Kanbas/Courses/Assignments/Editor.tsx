export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      {/* <label htmlFor="wd-name">Assignment Name</label> */}
      <h3 id="wd-name">Assignment Name</h3>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" cols={45} rows={9}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the tollowing: Your full name and section Links to each of the lab
        assignments Link to the Kanbas application Links to all relevant source
        code repositories The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        {/* Complete on your own */}
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS" selected>
                ASSIGNMENTS
              </option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="Letter">Letter</option>
              <option value="Percentage" selected>
                Percentage
              </option>
              <option value="GPA">GPA</option>
            </select>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="InPerson">In-person</option>
              <option value="Online" selected>
                Online
              </option>
            </select>
            <br />
            <label> Online Entry Options </label>
            <br />
            <input type="checkbox" name="check-genre" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input type="checkbox" name="check-genre" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input
              type="checkbox"
              name="check-genre"
              id="wd-media-recordings"
            />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input
              type="checkbox"
              name="check-genre"
              id="wd-student-annotation"
            />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input type="checkbox" name="check-genre" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <label htmlFor="wd-assign-to">Assignment Assign to</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input
              type="text"
              id="wd-assign-to"
              value="Everyone"
              title="everyone"
            />
            <br />
            <br />
            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input type="date" id="wd-due-date" value="2024-05-13" />
            <br />
            <br />
            <div className="wd-available-dates">
              <label htmlFor="wd-available-from">Available from</label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label htmlFor="wd-available-until">Until</label>
            </div>
            <div className="wd-date-inputs">
              <input type="date" id="wd-available-from" value="2024-05-06" />
              <input type="date" id="wd-available-until" value="2024-05-20" />
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}
