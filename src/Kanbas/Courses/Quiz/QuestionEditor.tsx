import React, { useState, useEffect } from "react";
import MultipleChoiceEditor from "./QuestionEditor/MultipleChoiceEditor";
import TrueFalseEditor from "./QuestionEditor/TrueFalseEditor";
import FillInBlanksEditor from "./QuestionEditor/FillInBlanksEditor";
import MultipleChoiceQuestion from "./QuizPreview/MultipleChoiceQuestion";
import TrueFalseQuestion from "./QuizPreview/TrueFalseQuestion";
import FillInBlanksQuestion from "./QuizPreview/FillInBlanksQuestion";

interface QuestionEditorProps {
  quiz: any;
  setQuiz: (quiz: any) => void;
}

export default function QuestionEditor({ quiz, setQuiz }: QuestionEditorProps) {
  const [questionType, setQuestionType] = useState("multipleChoice");
  const [isCreatingQuestion, setIsCreatingQuestion] = useState(false);
  const [currentlyEditingQuestion, setCurrentlyEditingQuestion] =
    useState<any>(null);

  // Handle saving a question
  const handleSave = (questionData: any) => {
    const updatedQuestions = quiz.questions ? [...quiz.questions] : [];
    const existingQuestionIndex = updatedQuestions.findIndex(
      (q: any) => q.id === questionData.id
    );
    if (existingQuestionIndex >= 0) {
      updatedQuestions[existingQuestionIndex] = questionData;
    } else {
      updatedQuestions.push(questionData);
    }
    // Update the quiz state with new questions
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    setQuiz(updatedQuiz);
    // Reset the editing state
    setCurrentlyEditingQuestion(null);
    setIsCreatingQuestion(false);
  };

  const handleCancel = () => {
    // Reset the editing state
    setCurrentlyEditingQuestion(null);
    setIsCreatingQuestion(false);
  };

  const renderEditor = () => {
    switch (questionType) {
      case "multipleChoice":
        return (
          <MultipleChoiceEditor
            onSave={handleSave}
            onCancel={handleCancel}
            question={currentlyEditingQuestion}
          />
        );
      case "trueFalse":
        return (
          <TrueFalseEditor
            onSave={handleSave}
            onCancel={handleCancel}
            question={currentlyEditingQuestion}
          />
        );
      case "fillInBlanks":
        return (
          <FillInBlanksEditor
            onSave={handleSave}
            onCancel={handleCancel}
            question={currentlyEditingQuestion}
          />
        );
      default:
        return null;
    }
  };

  const editQuestion = (question: any) => {
    setCurrentlyEditingQuestion(question);
    setIsCreatingQuestion(true);
    setQuestionType(
      question.type === "multiple-choice"
        ? "multipleChoice"
        : question.type === "true-false"
        ? "trueFalse"
        : "fillInBlanks"
    );
  };

  const deleteQuestion = (question: any) => {
    const updatedQuestions = quiz.questions.filter(
      (q: any) => q.id !== question.id
    );
    const updatedQuiz = { ...quiz, questions: updatedQuestions };
    setQuiz(updatedQuiz);
  };

  return (
    <div>
      {!isCreatingQuestion ? (
        <div>
          {/* List existing questions using preview components */}
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
                <div key={question.id}>
                  {/* Use preview components to display question */}
                  <QuestionComponent
                    question={question}
                    answer={null} // or any default value
                    onChange={() => {}} // No action needed
                    isFaculty
                  />
                  {/* Edit and Delete Buttons */}
                  <button
                    onClick={() => editQuestion(question)}
                    className="btn btn-warning me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteQuestion(question)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <hr />
                </div>
              )
            );
          })}

          {/* Option to add a new question */}
          <div className="d-flex justify-content-center align-items-center mb-4">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setIsCreatingQuestion(true);
                setCurrentlyEditingQuestion(null);
              }}
            >
              + New Question
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Question Type Selector */}
          {!currentlyEditingQuestion && (
            <div>
              <label>Select Question Type: </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <option value="multipleChoice">Multiple Choice</option>
                <option value="trueFalse">True/False</option>
                <option value="fillInBlanks">Fill in the Blanks</option>
              </select>
            </div>
          )}
          {renderEditor()}
        </div>
      )}
    </div>
  );
}
