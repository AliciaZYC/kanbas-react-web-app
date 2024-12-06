import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MultipleChoiceQuestion from "./QuizPreview/MultipleChoiceQuestion";
import TrueFalseQuestion from "./QuizPreview/TrueFalseQuestion";
import FillInBlanksQuestion from "./QuizPreview/FillInBlanksQuestion";
import { FaCheckCircle, FaTimesCircle, FaCircle } from "react-icons/fa";

function QuizResultScreen() {
  const { qid, cid } = useParams<{ qid: string; cid: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = location.state;
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const quiz = quizzes.find(
    (quiz: any) => quiz._id === qid && quiz.course === cid
  );
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const studentId = currentUser?._id;

  const { scores } = useSelector((state: any) => state.scoresReducer);
  const studentScore = scores.find(
    (score: any) => score.student === studentId && score.quiz === qid
  );

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h1>{quiz.title} - Results</h1>
      {studentScore && <p>Your Score: {studentScore.score}</p>}
      {quiz.questions.map((question: any) => {
        const studentAnswer = answers[question.id];
        let isCorrect = false;
        switch (question.type) {
          case "multiple-choice":
            isCorrect = question.choices.some(
              (choice: any) => choice.isCorrect && choice.text === studentAnswer
            );
            break;
          case "true-false":
            isCorrect = question.isTrue === studentAnswer;
            break;
          case "fill-in-blanks":
            isCorrect = question.correctAnswer === studentAnswer;
            break;
          default:
            break;
        }

        let QuestionComponent = null;
        switch (question.type) {
          case "multiple-choice":
            QuestionComponent = MultipleChoiceQuestion;
            break;
          case "true-false":
            QuestionComponent = TrueFalseQuestion;
            break;
          case "fill-in-blanks":
            QuestionComponent = FillInBlanksQuestion;
            break;
          default:
            return null;
        }

        return (
          <div key={question.id}>
            <QuestionComponent
              question={question}
              answer={studentAnswer}
              onChange={() => {}}
              isFaculty
            />
            {/* {isCorrect ? (
              <p style={{ color: "green" }}>Correct</p>
            ) : (
              <p style={{ color: "red" }}>Incorrect</p>
            )} */}
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="my-3"
            >
              {isCorrect ? (
                <>
                  <span className="me-4 position-relative">
                    <FaCheckCircle
                      style={{ top: "2px" }}
                      className="text-success me-1 position-absolute fs-5"
                    />
                    <FaCircle className="text-white me-1 fs-6" />
                  </span>
                  <label>Your answer is correct</label>
                </>
              ) : (
                <>
                  <span className="me-4 position-relative">
                    <FaTimesCircle
                      style={{ top: "2px" }}
                      className="text-danger me-1 position-absolute fs-5"
                    />
                    <FaCircle className="text-white me-1 fs-6" />
                  </span>
                  <label>Your answer is incorrect</label>
                </>
              )}
              {/* <p style={{ color: "black" }}>
                {isCorrect
                  ? "Your answer is correct"
                  : "Your answer is incorrect"}
              </p> */}
            </div>
          </div>
        );
      })}
      <button
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
        className="btn btn-secondary"
      >
        Back to QuizList
      </button>
    </div>
  );
}

export default QuizResultScreen;
