import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QuestionEditor from "./QuestionEditor";
import ReactQuill from "react-quill";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import { addQuiz, updateQuiz } from "./reducer";

function QuizEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  // Find the existing quiz or initialize a new one
  const existingQuiz = quizzes.find(
    (quiz: any) => quiz._id === qid && quiz.course === cid
  );
  const [quiz, setQuiz] = useState(
    existingQuiz || {
      title: "",
      description: "",
      quizType: "Graded Quiz",
      assignmentGroup: "Quizzes",
      shuffleAnswers: false,
      timeLimit: 20,
      multipleAttempts: false,
      attempts: 1,
      showCorrectAnswers: "",
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      questions: [],
      course: cid,
      published: false,
    }
  );
  function stripWrappingPTags(htmlContent: any) {
    if (
      htmlContent.startsWith("<p>") &&
      htmlContent.endsWith("</p>") &&
      htmlContent.indexOf("<p>", 1) === -1
    ) {
      return htmlContent.slice(3, -4);
    }
    return htmlContent;
  }
  // Handle saving the quiz
  const handleSave = () => {
    const totalPoints = quiz.questions
      ? quiz.questions.reduce(
          (sum: number, question: any) => sum + (question.points || 0),
          0
        )
      : 0;
    const quizDescription = stripWrappingPTags(quiz.description);
    // Update the quiz object
    const updatedQuiz = {
      ...quiz,
      points: totalPoints,
      description: quizDescription,
    };
    if (existingQuiz) {
      saveQuiz(updatedQuiz);
    } else {
      createQuiz(updatedQuiz);
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  // Create a new quiz
  const createQuiz = async (quiz: any) => {
    const newQuiz = await coursesClient.createQuizForCourse(
      cid as string,
      quiz
    );
    dispatch(addQuiz(newQuiz));
  };

  // Save (update) an existing quiz
  const saveQuiz = async (quiz: any) => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "detail"
  );

  const handleQuizSave = async () => {
    let quizId;
    if (existingQuiz) {
      saveQuiz(quiz);
      quizId = qid;
    } else {
      const newQuiz = await coursesClient.createQuizForCourse(
        cid as string,
        quiz
      );
      dispatch(addQuiz(newQuiz)); // Update Redux store
      quizId = newQuiz._id;
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes/Details/${quizId}`);
  };
  const formatForInput = (dateString: any) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // 截取到分钟部分
  };

  return (
    <div
      className="col-12"
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "20px 0",
        padding: "20px",
        height: "calc(100vh - 100px)",
        overflowY: "auto",
      }}
    >
      <hr />
      <div className="nav nav-tabs">
        <button
          className={`nav-link ${activeTab === "detail" ? "active" : ""}`}
          onClick={() => setActiveTab("detail")}
        >
          Details
        </button>
        <button
          className={`nav-link ${activeTab === "question" ? "active" : ""}`}
          onClick={() => setActiveTab("question")}
        >
          Questions
        </button>
      </div>
      <br />
      {activeTab === "detail" && (
        <>
          {/* Quiz Title Input */}
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            className="form-control mb-2"
            placeholder="Unnamed Quiz"
          />
          {/* Quiz Description Input */}
          <ReactQuill
            theme="snow"
            value={quiz.description}
            onChange={(value) =>
              setQuiz({
                ...quiz,
                description: value,
              })
            }
            style={{ marginBottom: "20px" }}
          />
          <br />
          <br />
          <div className="mb-3 row">
            <label
              htmlFor="wd-group"
              className="col-sm-2 col-form-label text-end"
            >
              Quiz Type
            </label>
            <div className="col-sm-10">
              <select
                id="wd-group"
                name="quizType"
                value={quiz.quizType}
                onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
                className="form-select"
              >
                <option value="Graded Quiz" selected>
                  Graded Quiz
                </option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </select>
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
              <select
                name="assignmentGroup"
                value={quiz.assignmentGroup}
                onChange={(e) =>
                  setQuiz({ ...quiz, assignmentGroup: e.target.value })
                }
                className="form-select"
              >
                <option value="Quizzes" selected>
                  Quizzes
                </option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Projects">Projects</option>
              </select>
              <br />

              <h5>Options</h5>

              <input
                type="checkbox"
                name="shuffleAnswers"
                style={{ marginRight: "10px" }}
                checked={quiz.shuffleAnswers}
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    shuffleAnswers: e.target.checked,
                  })
                }
              />
              <label>Shuffle Answers</label>
              <br />
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  name="time limit"
                  style={{ marginRight: "10px" }}
                  checked={Boolean(quiz.timeLimit)}
                />
                <label>Time Limit</label>
                <input
                  type="number"
                  name="timeLimit"
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    setQuiz({ ...quiz, timeLimit: e.target.value })
                  }
                  className="form-control mx-2 my-2"
                  placeholder="Time Limit (minutes)"
                  style={{ width: "100px" }}
                />
                <label>Minutes</label>
              </div>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="checkbox"
                  name="multipleAttempts"
                  style={{ marginRight: "10px" }}
                  checked={quiz.multipleAttempts}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      multipleAttempts: e.target.checked,
                    })
                  }
                />
                <label>Allow Multiple Attempts</label>
                {quiz.multipleAttempts && (
                  <input
                    type="number"
                    name="attempts"
                    value={quiz.attempts}
                    onChange={(e) =>
                      setQuiz({ ...quiz, attempts: e.target.value })
                    }
                    className="mx-3"
                    placeholder="Time Limit (minutes)"
                    style={{ width: "40px" }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mb-3 row">
            <label
              htmlFor="wd-group"
              className="col-sm-2 col-form-label text-end"
            >
              Assign
            </label>

            <div
              className="col-sm-10"
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              <h5>Assign to</h5>
              <input
                type="text"
                className="form-control"
                value="Everyone"
                readOnly
              />
              <br />
              <h5>Due</h5>
              <input
                type="datetime-local"
                className="form-control"
                name="dueDate"
                value={formatForInput(quiz.dueDate)}
                onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
              />
              <br />
              <div className="row">
                <div className="col-sm-6">
                  <h5>Available from</h5>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="availableDate"
                    value={formatForInput(quiz.availableDate)}
                    onChange={(e) =>
                      setQuiz({ ...quiz, availableDate: e.target.value })
                    }
                  />
                </div>
                <div className="col-sm-6">
                  <h5>Until</h5>
                  <input
                    type="datetime-local"
                    className="form-control"
                    name="untilDate"
                    value={formatForInput(quiz.untilDate)}
                    onChange={(e) =>
                      setQuiz({ ...quiz, untilDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end my-4">
              <button className="btn btn-success" onClick={handleQuizSave}>
                Save
              </button>
              {/* <button className="btn btn-danger" onClick={handleDiscard}>
                Cancel
              </button> */}
            </div>
          </div>
        </>
      )}
      {activeTab === "question" && (
        <div>
          {/* Pass quiz and setQuiz as props to QuestionEditor */}
          <QuestionEditor quiz={quiz} setQuiz={setQuiz} />
        </div>
      )}
      {/* Save and Cancel Buttons */}
      <div className="d-flex justify-content-center">
        <button onClick={handleSave} className="btn btn-danger">
          {qid ? "Update" : "Create"} & Save
        </button>
        <button onClick={handleCancel} className="btn btn-secondary ms-2">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default QuizEditor;
