import React from "react";

interface QuestionProps {
  question: {
    id: string;
    title: string;
    points: number;
    questionText: string;
    choices?: { text: string; isCorrect: boolean }[];
  };
  answer: any;
  onChange: (answer: any) => void;
  isFaculty: boolean;
}

function MultipleChoiceQuestion({
  question,
  answer,
  onChange,
  isFaculty,
}: QuestionProps) {
  return (
    <div style={styles.container}>
      <h4 style={styles.title}>
        {question.title}
        <span
          style={{
            fontWeight: "normal",
            fontSize: "14px",
            marginLeft: "10px",
            color: "#888",
          }}
        >
          ({question.points} points)
        </span>
      </h4>
      <div style={styles.content}>
        <p style={styles.questionText}>{question.questionText}</p>
        <div style={styles.choicesContainer}>
          {question.choices?.map((choice, index) => (
            <div key={index} style={styles.choice}>
              <input
                type="radio"
                name={`question-${question.id}`}
                id={`choice-${index}`}
                checked={isFaculty ? choice.isCorrect : answer === choice.text}
                disabled={isFaculty}
                onChange={() => onChange(choice.text)}
                style={styles.radioInput}
              />
              <label htmlFor={`choice-${index}`} style={styles.choiceLabel}>
                {choice.text}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: "20px 0",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    backgroundColor: "#f4f4f4",
    padding: "15px",
    margin: 0,
    fontSize: "18px",
    color: "#555",
    borderBottom: "1px solid #ddd",
  },
  content: {
    backgroundColor: "#fff",
    padding: "15px",
  },
  questionText: {
    fontSize: "16px",
    marginBottom: "15px",
    color: "#333",
  },
  choicesContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
  },
  choice: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    border: "1px solid #ddd",
    transition: "background-color 0.3s",
  },
  radioInput: {
    marginRight: "10px",
  },
  choiceLabel: {
    fontSize: "16px",
    color: "#333",
    cursor: "pointer",
  },
};

export default MultipleChoiceQuestion;
