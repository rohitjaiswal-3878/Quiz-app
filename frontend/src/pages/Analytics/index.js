import React, { useEffect, useState } from "react";
import "./index.css";
import deleteIcon from "../../assets/delete.png";
import shareIcon from "../../assets/share.png";
import editIcon from "../../assets/edit.png";
import { getImpressions } from "../../apis/dashboard";
import QuizAnalysis from "../../components/QuizAnalysis";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { deleteQuiz } from "../../apis/analytics";
import MyModal from "../../components/MyModal";
import ModalBtn from "../../utils/ModalBtn";

function Analytics() {
  const location = useLocation();
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selQuiz, setSelectedQuiz] = useState({});
  const [quizDelete, setQuizDelete] = useState("");
  const [components, setComponents] = useState({
    quizzesTable: true,
    quizAnalytics: false,
    deleteConfirm: false,
  });

  // Gets all quizes.
  useEffect(() => {
    getImpressions().then((data) => setAllQuizzes(data.quizImpressions));
  }, [components]);

  // Handles to go to quiz analytics page
  const handleAnalysisClick = (quiz) => {
    setSelectedQuiz(quiz);
    setComponents({
      quizzesTable: false,
      quizAnalytics: true,
      deleteConfirm: false,
    });
  };

  // Handles copying the quiz test link
  const handleCopyingLink = async (quizId) => {
    let currentURL = window.location.href.replace(location.pathname, "");
    let link = `${currentURL}/test/${quizId}`;
    await window.navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard");
  };

  // Handles deleting the quiz.
  const handleDelete = (quizId) => {
    setQuizDelete(quizId);
    setComponents({
      quizzesTable: true,
      quizAnalytics: false,
      deleteConfirm: true,
    });
  };

  // function to close modal.
  const onClose = () => {
    setQuizDelete("");
    setComponents({
      quizzesTable: true,
      quizAnalytics: false,
      deleteConfirm: false,
    });
  };

  // When confirm delete is clicked.
  const confirmDeleteBtn = () => {
    deleteQuiz(quizDelete).then((data) => {
      if (data.status == 200) {
        toast.success("Quiz deleted successfully!");
        setComponents({
          quizzesTable: true,
          quizAnalytics: false,
          deleteConfirm: false,
        });
      }
    });
  };
  // Confirm delete section
  const confirmDeleteSection = (
    <MyModal onClose={onClose}>
      <div className="confirm-delete">
        <h1>Are you confirm you want to delete ?</h1>
        <ModalBtn
          handleSubmit={onClose}
          deleteType={true}
          onClose={confirmDeleteBtn}
        >
          <span>Confirm Delete</span>
          <span>Cancel</span>
        </ModalBtn>
      </div>
    </MyModal>
  );
  return (
    <div className="analytics">
      {/* Quizzes table */}
      {components.quizzesTable ? (
        <div className="analytics-container">
          <h1>Quiz Analysis</h1>
          <div className="analytics-questions">
            <table>
              <tbody>
                <tr id="table-heading">
                  <th>S.No</th>
                  <th>Quiz Name</th>
                  <th>Created on</th>
                  <th>Impression</th>
                  <th></th>
                  <th className="last-col-table"></th>
                </tr>

                {allQuizzes.map((quiz, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{quiz.name}</td>
                    <td>
                      {new Date(quiz.created).toLocaleDateString("default", {
                        month: "short",
                        day: "numeric",
                      })}
                      ,{" "}
                      {new Date(quiz.created).toLocaleDateString("default", {
                        year: "numeric",
                      })}
                    </td>
                    <td>{quiz.impression}</td>
                    <td>
                      <div className="question-share-delete-edit">
                        <img src={editIcon} alt="edit" />
                        <img
                          src={deleteIcon}
                          alt="delete"
                          onClick={() => handleDelete(quiz.quizId)}
                        />
                        <img
                          src={shareIcon}
                          alt="share"
                          onClick={() => handleCopyingLink(quiz.quizId)}
                        />
                      </div>
                    </td>
                    <td className="last-col-table">
                      <span onClick={() => handleAnalysisClick(quiz)}>
                        Question wise Analysis
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {components.deleteConfirm && confirmDeleteSection}
        </div>
      ) : (
        // Quiz Analytics component
        <QuizAnalysis setComponents={setComponents} quiz={selQuiz} />
      )}
      <ToastContainer limit={1} autoClose={3000} />
    </div>
  );
}

export default Analytics;
