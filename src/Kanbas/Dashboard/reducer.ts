import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

interface EnrollmentState {
  enrollments: { user: string; course: string }[];
}

const initialState: EnrollmentState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    enroll: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments.push({ user: userId, course: courseId });
    },
    unenroll: (state, action) => {
      const { userId, courseId } = action.payload;
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
