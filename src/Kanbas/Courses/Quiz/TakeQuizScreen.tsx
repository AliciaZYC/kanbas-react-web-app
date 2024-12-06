import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MultipleChoiceQuestion from "./QuizPreview/MultipleChoiceQuestion";
import TrueFalseQuestion from "./QuizPreview/TrueFalseQuestion";
import FillInBlanksQuestion from "./QuizPreview/FillInBlanksQuestion";
import { addScore, updateScore } from "./scoresReducer";
import * as scoresClient from "./scoresClient";

function TakeQuizScreen() {
  const { qid, cid } = useParams<{ qid: string; cid: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [answers, setAnswers] = useState<{ [key: string]: any }>({});
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

  // Initialize timeRemaining safely
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Move useEffect to top level
  useEffect(() => {
    if (quiz?.timeLimit) {
      setTimeRemaining(quiz.timeLimit * 60);
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            handleSubmit();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quiz]);

  if (!quiz) return <p>Loading...</p>;

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    quiz.questions.forEach((question: any) => {
      const studentAnswer = answers[question.id];
      let correct = false;
      switch (question.type) {
        case "multiple-choice":
          correct = question.choices.some(
            (choice: any) => choice.isCorrect && choice.text === studentAnswer
          );
          break;
        case "true-false":
          correct = question.isTrue === studentAnswer;
          break;
        case "fill-in-blanks":
          correct = question.correctAnswer === studentAnswer;
          break;
        default:
          break;
      }
      if (correct) {
        totalScore += question.points || 1;
      }
    });
    return totalScore;
  };

  const handleSubmit = () => {
    const scoreValue = calculateScore();
    const quizId = quiz._id;

    if (!studentId || !quizId) {
      console.error("Student ID or Quiz ID is undefined");
      return;
    }

    const scoreData = { student: studentId, quiz: quizId, score: scoreValue };

    if (studentScore) {
      // Update existing score
      scoresClient
        .updateScore(studentId, quizId, { score: scoreValue })
        .then(() => {
          dispatch(updateScore({ ...studentScore, score: scoreValue }));
          navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/result`, {
            state: { answers },
          });
        })
        .catch((error) => {
          console.error("Error updating score:", error);
        });
    } else {
      // Create new score
      scoresClient
        .createScore(studentId, quizId, { score: scoreValue })
        .then((newScore) => {
          dispatch(addScore(newScore));
          navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/result`, {
            state: { answers },
          });
        })
        .catch((error) => {
          console.error("Error creating score:", error);
        });
    }
  };

  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      {quiz.timeLimit && (
        <p>
          Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}
        </p>
      )}
      {quiz.questions.map((question: any) => {
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
          QuestionComponent && (
            <QuestionComponent
              key={question.id}
              question={question}
              answer={answers[question.id]}
              onChange={(answer: any) =>
                handleAnswerChange(question.id, answer)
              }
              isFaculty={false} // Student view
            />
          )
        );
      })}
      <button onClick={handleSubmit} className="btn btn-primary">
        Submit Quiz
      </button>
    </div>
  );
}

export default TakeQuizScreen;
