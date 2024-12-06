import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scores: [],
};

const scoresSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {
    setScores: (state, action) => {
      state.scores = action.payload;
    },
    addScore: (state, { payload: score }) => {
      state.scores = [...state.scores, score] as any;
    },
    updateScore: (state, { payload: updatedScore }) => {
      state.scores = state.scores.map((score: any) =>
        score._id === updatedScore._id ? updatedScore : score
      ) as any;
    },
  },
});

// Export the action creators
export const { setScores, addScore, updateScore } = scoresSlice.actions;
export default scoresSlice.reducer;
