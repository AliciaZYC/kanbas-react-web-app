import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const fetchAllEnrollments = async () => {
  const { data } = await axios.get(ENROLLMENTS_API);
  return data;
};

export const enroll = async (userId: string, courseId: string) => {
  return await axios.post(ENROLLMENTS_API, { userId, courseId });
};

export const unenroll = async (userId: string, courseId: string) => {
  return await axios.delete(ENROLLMENTS_API, { data: { userId, courseId } });
};

export const checkEnrollment = async (userId: string, courseId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return response.data.enrolled;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/${userId}`);
  return response.data;
};
