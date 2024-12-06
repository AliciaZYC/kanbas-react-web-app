import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import { MdArrowDropDown } from "react-icons/md";
import { IoRocketOutline } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import RedBan from "./RedBan";
import * as coursesClient from "../client";
import * as quizzesClient from "./client";
import * as scoresClient from "./scoresClient";
import { setScores } from "./scoresReducer";

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleAddQuiz = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/new`);
  };

  const handleDelete = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleDeleteAll = async () => {
    if (cid) {
      await quizzesClient.deleteAllQuizzes(cid);
      dispatch(setQuizzes([]));
    }
  };

  const handlePublishAll = async (publish: boolean) => {
    if (cid) {
      const updatedQuizzes = quizzes.map((quiz: any) => ({
        ...quiz,
        published: publish,
      }));
      for (const quiz of updatedQuizzes) {
        await quizzesClient.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
      }
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleEdit = (quizId: string) => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/edit/${quizId}`);
  };

  const togglePublishStatus = async (quizId: string, isPublished: boolean) => {
    if (!cid) {
      console.error("Course ID is undefined");
      return;
    }
    const quizToUpdate = quizzes.find((quiz: any) => quiz._id === quizId);
    if (!quizToUpdate) {
      console.error("Quiz not found");
      return;
    }
    const updatedQuiz = { ...quizToUpdate, published: !isPublished };
    await quizzesClient.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const filteredQuizzes = isStudent
    ? quizzes.filter((quiz: any) => quiz.published)
    : quizzes;

  const { scores } = useSelector((state: any) => state.scoresReducer);
  useEffect(() => {
    fetchQuizzes();
    if (isStudent) {
      scoresClient.fetchAllScores().then((allScores) => {
        const studentScores = allScores.filter(
          (score: any) => score.student === currentUser._id
        );
        dispatch(setScores(studentScores));
      });
    }
  }, [isStudent, currentUser._id]);

  const formatDateTime = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="Search for Quiz"
          style={{ maxWidth: "300px" }}
        />
        {isFaculty && (
          <div>
            <button
              onClick={handleAddQuiz}
              className="btn btn-lg btn-danger me-1"
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />{" "}
              Add Quiz
            </button>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <IoEllipsisVertical
                className="position-relative"
                style={{ fontSize: "30px" }}
              />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleDeleteAll()}
                >
                  Delete All Quizzes
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handlePublishAll(true)}
                >
                  Publish All
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handlePublishAll(false)}
                >
                  Unpublish All
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      <hr />
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <MdArrowDropDown className="me-1 fs-3" />
            Assignment Quizzes
          </div>
          <ul className="wd-lessons list-group rounded-0 wd-padded-left wd-bg-color-green">
            {filteredQuizzes.map((quiz: any) => {
              const studentScore = scores.find(
                (score: any) => score.quiz === quiz._id
              );

              return (
                <li
                  key={quiz._id}
                  className="wd-lesson list-group-item d-flex align-items-center p-3"
                >
                  <div className="icon-container me-2">
                    <IoRocketOutline className="text-success fs-3" />
                  </div>
                  <div className="quiz-details flex-grow-1">
                    <strong>
                      <Link
                        to={`/Kanbas/Courses/${cid}/Quizzes/Details/${quiz._id}`}
                        className="wd-_id"
                      >
                        {quiz.title}
                      </Link>
                    </strong>
                    <h6>
                      <p className="wd-fg-color-red">
                        <span className="wd-fg-color-black">
                          {new Date() < new Date(quiz.availableDate) ? (
                            <>
                              <strong>Not available until</strong>{" "}
                              {formatDateTime(quiz.availableDate)}
                            </>
                          ) : new Date() > new Date(quiz.untilDate) ? (
                            <>Closed</>
                          ) : (
                            <>Available</>
                          )}{" "}
                          | <b>Due</b>{" "}
                          {formatDateTime(quiz.dueDate) || "No Due Date"} |{" "}
                          {quiz.points || 0} pts | {quiz.questions?.length}{" "}
                          Questions
                          {isStudent && studentScore && (
                            <> | Score: {studentScore.score}</>
                          )}
                        </span>
                      </p>
                    </h6>
                  </div>
                  {isFaculty && (
                    <div className="d-flex align-items-center">
                      {quiz.published ? <GreenCheckmark /> : <RedBan />}
                      <div className="dropdown">
                        <button
                          className="btn dropdown-toggle"
                          type="button"
                          id={`quizMenuButton-${quiz._id}`}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <IoEllipsisVertical style={{ fontSize: "20px" }} />
                        </button>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby={`quizMenuButton-${quiz._id}`}
                        >
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleEdit(quiz._id)}
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() => handleDelete(quiz._id)}
                            >
                              Delete
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                togglePublishStatus(quiz._id, quiz.published)
                              }
                            >
                              Publish/Unpublish
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
