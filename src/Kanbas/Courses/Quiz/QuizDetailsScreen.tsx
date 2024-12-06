import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as quizzesClient from "./client";
import * as scoresClient from "./scoresClient";
import { setScores, addScore } from "./scoresReducer";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find(
    (quiz: any) => quiz._id === qid && quiz.course === cid
  );

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${qid}`);
  };
  const handlePreview = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/preview/${qid}`);
  };

  const isStudent = currentUser?.role === "STUDENT";
  const studentId = currentUser?._id;
  const quizId = quiz._id;
  const { scores } = useSelector((state: any) => state.scoresReducer);
  const studentScore = scores.find(
    (score: any) => score.student === studentId && score.quiz === qid
  );

  useEffect(() => {
    if (isStudent) {
      // Fetch the student's score
      scoresClient.fetchScore(studentId, quizId).then((score) => {
        if (score) {
          dispatch(addScore(score)); // Changed from updateScore to addScore
        }
      });
    }
  }, [isStudent, quizId, dispatch, studentId]);

  const [enteredAccessCode, setEnteredAccessCode] = useState("");
  const [accessCodeError, setAccessCodeError] = useState("");
  const handleStartQuiz = () => {
    if (quiz.accessCode && enteredAccessCode !== quiz.accessCode) {
      setAccessCodeError("Incorrect access code.");
      return;
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/take`);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      {isFaculty && (
        <>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button onClick={handlePreview} style={{ margin: "5px" }}>
              Preview
            </button>
            <button onClick={handleEdit} style={{ margin: "5px" }}>
              Edit
            </button>
          </div>
          <hr />
        </>
      )}
      <h2 style={{ textAlign: "left" }}>{quiz.title}</h2>
      <div style={{ textAlign: "center" }}>
        {isFaculty && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {[
                ["Quiz Type", quiz.quizType],
                ["Points", quiz.points],
                ["Assignment Group", quiz.assignmentGroup],
                ["Shuffle Answers", quiz.shuffleAnswers ? "Yes" : "No"],
                ["Time Limit", `${quiz.timeLimit} minutes`],
                ["Multiple Attempts", quiz.multipleAttempts ? "Yes" : "No"],
                ["How Many Attempts", quiz.attempts],
                ["Show Correct Answers", quiz.showCorrectAnswers],
                ["Access Code", quiz.accessCode],
                [
                  "One Question at a Time",
                  quiz.oneQuestionAtATime ? "Yes" : "No",
                ],
                ["Webcam Required", quiz.webcamRequired ? "Yes" : "No"],
                [
                  "Lock Questions After Answering",
                  quiz.lockQuestionsAfterAnswering ? "Yes" : "No",
                ],
              ].map(([label, value]) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "5px",
                  }}
                >
                  <strong style={{ textAlign: "right", width: "50%" }}>
                    {label}:
                  </strong>
                  <span
                    style={{
                      marginLeft: "10px",
                      textAlign: "left",
                      width: "50%",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <table
                style={{
                  margin: "auto",
                  border: "1px solid black",
                  borderCollapse: "collapse",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Due
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      For
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Available From
                    </th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>
                      Until
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {new Date(quiz.dueDate).toLocaleDateString()}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      Everyone
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {new Date(quiz.availableDate).toLocaleDateString()}
                    </td>
                    <td
                      style={{
                        border: "1px solid black",
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      {new Date(quiz.untilDate).toLocaleDateString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      {/* Show score if current user is a student */}
      {isStudent && studentScore && (
        <p className="d-flex justify-content-center">
          Your last score: {studentScore.score}
        </p>
      )}
      {/* Start Quiz Button */}
      {isStudent && (
        <div>
          {quiz.accessCode && (
            <>
              <div className="d-flex justify-content-center my-2">
                <input
                  type="text"
                  placeholder="Enter Access Code"
                  value={enteredAccessCode}
                  onChange={(e) => setEnteredAccessCode(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                {accessCodeError && (
                  <p style={{ color: "red" }}>{accessCodeError}</p>
                )}
              </div>
            </>
          )}
          <div className="d-flex justify-content-center">
            <button onClick={handleStartQuiz} style={{ margin: "5px" }}>
              Start Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
