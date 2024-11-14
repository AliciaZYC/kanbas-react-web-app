import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const enrollCourse = async (userId: String, courseId: string) => {
  const response = await axios.post(
    `${COURSES_API}/${userId}/${courseId}/enroll`
  );
  return response.data;
};
export const unenrollCourse = async (userId: String, courseId: string) => {
  const response = await axios.delete(
    `${COURSES_API}/${userId}/${courseId}/unenroll`
  );
  return response.data;
};

export const fetchEnrolledCourses = async (userId: string) => {
  try {
    const response = await axios.get(
      `${REMOTE_SERVER}/api/users/${userId}/courses`,
      {
        withCredentials: true, // 确保包含 session cookie
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw error; // 抛出错误，以便调用方决定如何处理
  }
};
