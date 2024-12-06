import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TrueFalseEditorProps {
  onSave: (questionData: any) => void;
  onCancel: () => void;
  question?: {
    id: string;
    title: string;
    questionText: string;
    isTrue: boolean;
    points: number;
  };
}

function TrueFalseEditor({ onSave, onCancel, question }: TrueFalseEditorProps) {
  const [questionState, setQuestionState] = useState({
    id: question?.id || "",
    type: "true-false",
    title: question?.title || "",
    points: question?.points || 5,
    questionText: question?.questionText || "",
    isTrue: question?.isTrue || false,
  });

  useEffect(() => {
    setQuestionState({
      id: question?.id || "",
      type: "true-false",
      title: question?.title || "",
      points: question?.points || 5,
      questionText: question?.questionText || "",
      isTrue: question?.isTrue || false,
    });
  }, [question]);

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
      {/* Title and Points */}
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

      {/* Question Text */}
      <h5>Question:</h5>
      <ReactQuill
        theme="snow"
        value={questionState.questionText}
        onChange={(value) =>
          setQuestionState({ ...questionState, questionText: value })
        }
        style={{ marginBottom: "20px" }}
      />

      {/* Answer Options */}
      <div>
        <h5>Answers:</h5>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={`isTrue-${questionState.id || "new"}`}
            checked={questionState.isTrue}
            onChange={() =>
              setQuestionState({ ...questionState, isTrue: true })
            }
          />
          <label className="form-check-label">True</label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name={`isTrue-${questionState.id || "new"}`}
            checked={!questionState.isTrue}
            onChange={() =>
              setQuestionState({ ...questionState, isTrue: false })
            }
          />
          <label className="form-check-label">False</label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-danger ms-2" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TrueFalseEditor;
