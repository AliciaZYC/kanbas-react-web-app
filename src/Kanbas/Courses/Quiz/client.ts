import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quiz._id}`,
    quiz
  );
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}`
  );
  return response.data;
};

export const deleteAllQuizzes = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/quizzes`
  );
  return response.data;
};
