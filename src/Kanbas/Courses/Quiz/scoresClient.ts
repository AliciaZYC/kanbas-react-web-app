import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const SCORES_API = `${REMOTE_SERVER}/api/scores`;

// Fetch all scores
export const fetchAllScores = async () => {
  try {
    const response = await axiosWithCredentials.get(SCORES_API);
    return response.data;
  } catch (error) {
    console.error("Error fetching all scores:", error);
    throw error;
  }
};

// Fetch a specific score by user ID and quiz ID
export const fetchScore = async (uid: string, qid: string) => {
  const response = await axiosWithCredentials.get(
    `${SCORES_API}/${uid}/${qid}`
  );
  return response.data;
};

// Create a new score
export const createScore = async (
  uid: string,
  qid: string,
  scoreData: object
) => {
  try {
    const response = await axiosWithCredentials.post(
      `${SCORES_API}/${uid}/${qid}`,
      scoreData
    );
    return response.data;
  } catch (error) {
    console.error(`Error creating score for UID: ${uid}, QID: ${qid}`, error);
    throw error;
  }
};

// Update an existing score
export const updateScore = async (
  uid: string,
  qid: string,
  scoreUpdates: object
) => {
  try {
    await axiosWithCredentials.put(`${SCORES_API}/${uid}/${qid}`, scoreUpdates);
    return { status: "success", message: "Score updated successfully" };
  } catch (error) {
    console.error(`Error updating score for UID: ${uid}, QID: ${qid}`, error);
    throw error;
  }
};
