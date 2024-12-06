import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import GradesTable from "./Grades/Table";
import { FaAlignJustify } from "react-icons/fa6";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import PeopleTable from "./People/Table";
import React, { useEffect, useState } from "react";
import * as courseClient from "./client";
import Quiz from "./Quiz";
import QuizEditor from "./Quiz/DetailsEditor";
import QuizDetails from "./Quiz/QuizDetailsScreen";
import QuizPreviewScreen from "./Quiz/QuizPreviewScreen";
import TakeQuizScreen from "./Quiz/TakeQuizScreen";
import QuizResultScreen from "./Quiz/QuizResultScreen";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await courseClient.findUsersForCourse(cid as string);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (cid) {
      fetchUsers();
    }
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Assignments/new" element={<AssignmentEditor />} />
            <Route path="Grades" element={<GradesTable />} />
            <Route path="People" element={<PeopleTable users={users} />} />
            <Route path="Quizzes" element={<Quiz />} />
            <Route path="Quizzes/edit/:qid" element={<QuizEditor />} />
            <Route
              path="Quizzes/preview/:qid"
              element={<QuizPreviewScreen />}
            />
            <Route path="Quizzes/new" element={<QuizEditor />} />
            <Route path="Quizzes/Details/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/take" element={<TakeQuizScreen />} />
            <Route path="Quizzes/:qid/result" element={<QuizResultScreen />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
