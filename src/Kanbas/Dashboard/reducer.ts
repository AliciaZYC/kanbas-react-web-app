import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  enrollments: [],
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, { payload: { userId, courseId } }) => {
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenrollCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          enrollment.user !== userId || enrollment.course !== courseId
      ) as any;
    },
    updateEnrollment: (state, { payload: updatedEnrollment }) => {
      state.enrollments = state.enrollments.map((enrollment: any) =>
        enrollment._id === updatedEnrollment._id
          ? updatedEnrollment
          : enrollment
      ) as any;
    },
    unenrollAllFromCourse: (state, { payload: courseId }) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) => enrollment.course !== courseId
      ) as any;
    },
  },
});

export const {
  enrollCourse,
  unenrollCourse,
  updateEnrollment,
  unenrollAllFromCourse,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
