import React from "react";

interface QuestionProps {
  question: {
    id: string;
    title: string;
    questionText: string;
    points: number;
    choices?: { text: string; isCorrect: boolean }[];
    isTrue?: boolean;
  };
  answer: any;
  onChange: (answer: any) => void;
  isFaculty: boolean;
}

function FillInBlanksQuestion({
  question,
  answer,
  onChange,
  isFaculty,
}: QuestionProps) {
  return (
    <div style={styles.container}>
      <h4 style={styles.title}>{question.title}<span
          style={{
            fontWeight: "normal",
            fontSize: "14px",
            marginLeft: "10px",
            color: "#888",
          }}
        >
          ({question.points} points)
        </span></h4>
      <div style={styles.content}>
        <p style={styles.questionText}>{question.questionText}</p>
        {question.choices &&
          question.choices.map((_, index) => (
            <div key={index} style={styles.inputContainer}>
              <input
                type="text"
                // value={answer || ""}
                value={isFaculty ? _.text || "" : answer || ""}
                onChange={(e) => onChange(e.target.value)}
                // placeholder={_.text}
                placeholder="Type your answer"
                style={styles.input}
                disabled={isFaculty}
              />
            </div>
          ))}
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
  inputContainer: {
    marginTop: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
    color: "#333",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s, box-shadow 0.3s",
  },
  inputFocus: {
    borderColor: "#aaa",
    boxShadow: "0 0 5px rgba(0, 0, 255, 0.2)",
  },
};

export default FillInBlanksQuestion;
