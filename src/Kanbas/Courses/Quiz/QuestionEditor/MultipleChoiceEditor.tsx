import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaTrash } from "react-icons/fa";

interface Answer {
  text: string;
  isCorrect: boolean;
}

interface QuestionData {
  id?: string;
  type: string;
  title: string;
  points: number;
  questionText: string;
  choices: Answer[];
}

interface Props {
  onSave: (questionData: QuestionData) => void;
  onCancel: () => void;
  question?: QuestionData;
}

function MultipleChoiceEditor({ onSave, onCancel, question }: Props) {
  const [questionState, setQuestionState] = useState<QuestionData>({
    id: question?.id || "",
    type: "multiple-choice",
    title: question?.title || "",
    points: question?.points || 5,
    questionText: question?.questionText || "",
    choices: question?.choices || [{ text: "", isCorrect: true }],
  });

  // Ensure that when question prop changes (e.g., when editing a different question), the state updates accordingly
  useEffect(() => {
    setQuestionState({
      id: question?.id || "",
      type: "multiple-choice",
      title: question?.title || "",
      points: question?.points || 5,
      questionText: question?.questionText || "",
      choices: question?.choices || [{ text: "", isCorrect: true }],
    });
  }, [question]);

  const handleAddChoice = () => {
    setQuestionState({
      ...questionState,
      choices: [...questionState.choices, { text: "", isCorrect: false }],
    });
  };

  const handleChoiceChange = (index: number, text: string) => {
    const newChoices = questionState.choices.map((choice, i) => {
      if (i === index) return { ...choice, text };
      return choice;
    });
    setQuestionState({ ...questionState, choices: newChoices });
  };

  const handleChoiceCorrectChange = (index: number) => {
    const newChoices = questionState.choices.map((choice, i) => {
      return { ...choice, isCorrect: i === index };
    });
    setQuestionState({ ...questionState, choices: newChoices });
  };

  const handleRemoveChoice = (index: number) => {
    const newChoices = questionState.choices.filter((_, i) => i !== index);
    setQuestionState({ ...questionState, choices: newChoices });
  };

  // const handleSave = () => {
  //   const questionData = {
  //     ...questionState,
  //     id: questionState.id || `q-${Date.now()}`,
  //   };
  //   onSave(questionData);
  // };
  // Utility function to strip wrapping <p> tags
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

  // In your editor components, before saving
  const handleSave = () => {
    const questionData = {
      ...questionState,
      id: questionState.id || `q-${Date.now()}`,
      questionText: stripWrappingPTags(questionState.questionText),
    };
    onSave(questionData);
  };

  return (
    <div className="my-4">
      {/* Title and Points Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Question Title"
          value={questionState.title}
          onChange={(e) =>
            setQuestionState({ ...questionState, title: e.target.value })
          }
          style={{ maxWidth: "60%" }}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <label style={{ marginRight: "10px" }}>Points:</label>
          <input
            type="number"
            className="form-control"
            placeholder="Points"
            value={questionState.points}
            onChange={(e) =>
              setQuestionState({
                ...questionState,
                points: parseInt(e.target.value, 10),
              })
            }
            style={{ maxWidth: "80px" }}
          />
        </div>
      </div>

      {/* Question Text Section */}
      <h5>Question:</h5>
      <ReactQuill
        theme="snow"
        value={questionState.questionText}
        onChange={(value) =>
          setQuestionState({ ...questionState, questionText: value })
        }
        style={{ marginBottom: "20px" }}
      />

      {/* Answers Section */}
      <h5>Answers:</h5>
      {questionState.choices.map((choice, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <input
            type="radio"
            name={`correctAnswer-${questionState.id || "new"}`}
            checked={choice.isCorrect}
            onChange={() => handleChoiceCorrectChange(index)}
            style={{ marginRight: "10px" }}
          />
          <input
            type="text"
            value={choice.text}
            onChange={(e) => handleChoiceChange(index, e.target.value)}
            className="form-control"
            style={{ flex: "1", marginRight: "10px" }}
          />
          {questionState.choices.length > 1 && (
            <button
              onClick={() => handleRemoveChoice(index)}
              className="btn btn-link text-danger"
            >
              <FaTrash />
            </button>
          )}
        </div>
      ))}

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <button className="btn btn-secondary" onClick={handleAddChoice}>
          Add Answer
        </button>
        <div>
          <button className="btn btn-success me-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-danger" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultipleChoiceEditor;
