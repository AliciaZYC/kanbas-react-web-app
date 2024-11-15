import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "../Account/ProtectedRoute";
import * as courseClient from "../Courses/client";
import * as accountClient from "../Account/client";
import * as enrollmentClient from "./enrollmentsClient";
import { enrollCourse, unenrollCourse } from "./reducer";

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
  const [showAllCourses, setShowAllCourses] = useState(false);
  const dispatch = useDispatch();
  const [localCourses, setLocalCourses] = useState<any[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const handleEnroll = async (courseId: string) => {
    try {
      await enrollmentClient.enrollCourse(currentUser._id, courseId);
      const updatedCourses = await accountClient.findMyCourses();
      setEnrolledCourses(updatedCourses);
      dispatch(enrollCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  };

  const handleUnenroll = async (courseId: string) => {
    try {
      await enrollmentClient.unenrollCourse(currentUser._id, courseId);
      const updatedCourses = await accountClient.findMyCourses();
      setLocalCourses(updatedCourses);
      setEnrolledCourses(updatedCourses);
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Unenrollment failed:", error);
    }
  };

  const toggleCourseList = async () => {
    setShowAllCourses((prev) => !prev);
    if (!showAllCourses) {
      const allCourses = await courseClient.fetchAllCourses();
      setLocalCourses(allCourses);
    } else {
      setLocalCourses(enrolledCourses);
    }
  };

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const courses = await accountClient.findMyCourses();
      setEnrolledCourses(courses);
      setLocalCourses(courses);
    };

    fetchEnrolledCourses();
  }, [currentUser]);

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
          className="btn btn-primary  float-end mb-3"
          onClick={toggleCourseList}
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Course"}
        </button>
      )}
      <h2 id="wd-dashboard-published">
        {showAllCourses
          ? "Published Courses (" + localCourses.length + ")"
          : "Enrolled Courses (" + localCourses.length + ")"}
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {localCourses.map((course: any) => (
            <div
              key={course._id}
              className="wd-dashboard-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <ProtectedRoute>
                  <Link
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    to={`/Kanbas/Courses/${course._id}`}
                  >
                    <img
                      src={`/images/${course._id}.png`}
                      width={280}
                      height={160}
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
                        to={`/Kanbas/Courses/${course._id}`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                      {isStudent &&
                        (enrolledCourses.some((c) => c._id === course._id) ? (
                          <button
                            className="btn btn-danger float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              handleUnenroll(course._id);
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              handleEnroll(course._id);
                            }}
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
                  </Link>
                </ProtectedRoute>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
