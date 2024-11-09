import { createSlice } from "@reduxjs/toolkit";

const initialState: { enrollments: any[] } = {
  enrollments: [],
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (state, { payload: { userId, courseId } }) => {
      const newEnrollment = {
        _id: new Date().getTime().toString(),
        user: userId,
        course: courseId,
      };
      if (
        !state.enrollments.some(
          (enrollment) =>
            enrollment.user === userId && enrollment.course === courseId
        )
      ) {
        state.enrollments = [...state.enrollments, newEnrollment];
      }
    },
    unenroll: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) =>
          !(enrollment.user === userId && enrollment.course === courseId)
      );
    },
  },
});

export const { enroll, unenroll, setEnrollments } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
