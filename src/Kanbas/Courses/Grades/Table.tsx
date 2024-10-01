import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { users, enrollments, assignments, grades } from "../../Database";
import { useParams } from "react-router-dom";

export default function GradesTable() {
  const { cid } = useParams();

  // Filter enrollments for the given course
  const enrolledUsers = enrollments
    .filter((enrollment) => enrollment.course === cid)
    .map((enrollment) => users.find((user) => user._id === enrollment.user));

  // Get assignments for the course
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === cid
  );

  // Function to get the grade for a specific user and assignment
  const getGrade = (studentId: string, assignmentId: string) => {
    const gradeRecord = grades.find(
      (grade) =>
        grade.student === studentId && grade.assignment === assignmentId
    );
    return gradeRecord ? gradeRecord.grade : "N/A"; // If no grade, show "N/A"
  };

  return (
    <div id="wd-grades-table">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            {/* Render assignment titles as columns */}
            {courseAssignments.map((assignment) => (
              <th key={assignment._id}>{assignment.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Render enrolled users */}
          {enrolledUsers.map(
            (user) =>
              user ? ( // Ensure user is defined
                <tr key={user._id}>
                  <td className="wd-full-name text-nowrap">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName}</span>{" "}
                    <span className="wd-last-name">{user.lastName}</span>
                  </td>
                  <td className="wd-login-id">{user.username}</td>
                  <td className="wd-section">S101</td>
                  <td className="wd-role">{user.role}</td>
                  {/* Render grades for each assignment */}
                  {courseAssignments.map((assignment) => (
                    <td key={assignment._id}>
                      {getGrade(user._id, assignment._id)}
                    </td>
                  ))}
                </tr>
              ) : null // Skip rendering if the user is undefined
          )}
        </tbody>
      </table>
    </div>
  );
}
