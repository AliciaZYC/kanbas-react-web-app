import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        // _id: new Date().getTime().toString(), // Generate unique ID
        course: quiz.course,
        published: quiz.published || false,
        title: quiz.title,
        description: quiz.description || "",
        quizType: quiz.quizType || "multiple-choice",
        points: quiz.points || 100,
        assignmentGroup: quiz.assignmentGroup || "Default Group",
        shuffleAnswers: quiz.shuffleAnswers || false,
        timeLimit: quiz.timeLimit || 0, // Default to no time limit
        multipleAttempts: quiz.multipleAttempts || false,
        showCorrectAnswers: quiz.showCorrectAnswers || "never",
        accessCode: quiz.accessCode || "",
        oneQuestionAtATime: quiz.oneQuestionAtATime || false,
        webcamRequired: quiz.webcamRequired || false,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering || false,
        dueDate: quiz.dueDate || "2024-05-13T23:59",
        availableDate: quiz.availableDate || "2024-05-06T23:59",
        untilDate: quiz.untilDate || "2024-05-20T23:59",
        questions: quiz.questions || [],
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizzId }) => {
      state.quizzes = state.quizzes.filter((quiz: any) => quiz._id !== quizzId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
  },
});

// Export the automatically generated action creators
export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
