import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import * as db from "../Database";
import * as courseClient from "../Courses/client";
import * as enrollmentClint from "./enrollmentsClient";
import { enroll, unenroll } from "./reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";
  // const { enrollments } = db;
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const fetchAllCourses = async () => {
    let courses = [];
    try {
      courses = await courseClient.fetchAllCourses();
    } catch (error) {
      console.error(error);
    }
    setAllCourses(courses);
  };
  useEffect(() => {
    fetchAllCourses();
  });
  const [showAllCourses, setShowAllCourses] = useState(false);
  const toggleEnrollments = () => setShowAllCourses(!showAllCourses);
  const coursesToDisplay = showAllCourses ? allCourses : courses;
  const dispatch = useDispatch();
  const [enrollmentStatuses, setEnrollmentStatuses] = useState<{
    [key: string]: boolean;
  }>({});

  const fetchEnrollments = async () => {
    try {
      const statuses = await Promise.all(
        courses.map(async (course) => {
          const enrolled = await enrollmentClint.checkEnrollment(
            currentUser._id,
            course._id
          );
          return { [course._id]: enrolled };
        })
      );
      // Consolidate all statuses into a single object
      setEnrollmentStatuses(Object.assign({}, ...statuses));
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    }
  };
  // Call fetchEnrollments in useEffect
  useEffect(() => {
    if (isStudent) {
      fetchEnrollments();
    }
  }, [courses, currentUser, isStudent]);

  const isEnrolled = (courseId: string) => enrollmentStatuses[courseId];

  const handleEnroll = async (courseId: string) => {
    try {
      // Send request to server
      const response = await enrollmentClint.enroll(currentUser._id, courseId);

      if (response.status === 200) {
        // Only update Redux state if the server confirms the enrollment
        dispatch(enroll({ userId: currentUser._id, courseId }));
        setEnrollmentStatuses({ ...enrollmentStatuses, [courseId]: true });
        fetchEnrollments();
        navigate("/Kanbas/Dashboard");
      }
    } catch (error) {
      console.error("Failed to enroll:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      // Send request to server
      const response = await enrollmentClint.unenroll(
        currentUser._id,
        courseId
      );

      if (response.status === 200) {
        // Only update Redux state if the server confirms unenrollment
        dispatch(unenroll({ userId: currentUser._id, courseId }));
        setEnrollmentStatuses({ ...enrollmentStatuses, [courseId]: false });
        fetchEnrollments();
        navigate("/Kanbas/Dashboard");
      }
    } catch (error) {
      console.error("Failed to unenroll:", error);
    }
  };
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              {" "}
              Add{" "}
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      {isStudent && (
        <button
          className="btn btn-primary float-end mb-3"
          onClick={toggleEnrollments}
        >
          {showAllCourses ? "My Enrollments" : "All Courses"}
        </button>
      )}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {coursesToDisplay.map((course: any) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <Link
                to={
                  isEnrolled(course._id)
                    ? `/Kanbas/Courses/${course._id}/Home`
                    : "#"
                }
                className="text-decoration-none"
              >
                <div className="card rounded-3 overflow-hidden">
                  <img
                    src={`/images/${course._id}.png`}
                    height="{160}"
                    alt=""
                  />
                  <div className="card-body">
                    <span
                      className="wd-dashboard-course-link"
                      style={{
                        textDecoration: "none",
                        color: "navy",
                        fontWeight: "bold",
                      }}
                    >
                      {course.name}
                    </span>
                    <p
                      className="wd-dashboard-course-title card-text"
                      style={{ maxHeight: 53, overflow: "hidden" }}
                    >
                      {course.description}
                    </p>
                    <Link
                      to={`/Kanbas/Courses/${course._id}/Home`}
                      className="btn btn-primary"
                    >
                      Go
                    </Link>
                    {isStudent &&
                      (isEnrolled(course._id) ? (
                        <button
                          onClick={() => handleUnenroll(course._id)}
                          className="btn btn-danger float-end"
                        >
                          Unenroll
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnroll(course._id)}
                          className="btn btn-success float-end"
                        >
                          Enroll
                        </button>
                      ))}
                    {isFaculty && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
