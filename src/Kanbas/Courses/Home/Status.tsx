import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle, FaChartBar, FaChartLine } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { AiFillHome } from "react-icons/ai";
import { IoMdMegaphone } from "react-icons/io";
import { MdNotifications } from "react-icons/md";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "300px" }}>
      <h2>Course Status</h2>
      <div className="d-flex">
        <div className="w-50 pe-1">
          <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish{" "}
          </button>
        </div>
        <div className="w-50">
          <button className="btn btn-lg btn-success w-100">
            <FaCheckCircle className="me-2 fs-5" /> Publish{" "}
          </button>
        </div>
      </div>
      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <BiImport className="me-2 fs-5" /> Import Existing Content{" "}
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons{" "}
      </button>
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <AiFillHome className="me-2 fs-5" />
        Choose Home Page
      </button>
      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaChartBar className="me-2 fs-5" />
        View Course Stream
      </button>
      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <IoMdMegaphone className="me-2 fs-5" />
        New Announcement
      </button>
      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaChartLine className="me-2 fs-5" />
        New Analytics
      </button>
      <br />
      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <MdNotifications className="me-2 fs-5" />
        View Course Notifications
      </button>
      <br />
    </div>
  );
}
