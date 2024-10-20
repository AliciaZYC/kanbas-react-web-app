import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    enroll: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        user: enrollment.user,
        course: "",
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },

    unenroll: (state, { payload: enrollmentId }) => {
      state.enrollments = state.enrollments.filter(
        (enroll: any) => enroll._id !== enrollmentId
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
