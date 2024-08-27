import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import deleteIcon from "../../assets/delete.png";
import shareIcon from "../../assets/share.png";
import editIcon from "../../assets/edit.png";
import { getImpressions } from "../../apis/dashboard";
import QuizAnalysis from "../../components/QuizAnalysis";
import { useLocation, useOutletContext } from "react-router-dom";
import { deleteQuiz } from "../../apis/analytics";
import MyModal from "../../components/MyModal";
import ModalBtn from "../../utils/ModalBtn";
import toast, { Toaster } from "react-hot-toast";
import QuizEdit from "../../components/QuizEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Analytics() {
  const [selected, setSelected] = useOutletContext();
  const location = useLocation();
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selQuiz, setSelectedQuiz] = useState({});
  const [quizDelete, setQuizDelete] = useState("");
  const [components, setComponents] = useState({
    quizzesTable: true,
    quizAnalytics: false,
    deleteConfirm: false,
    editQuiz: false,
  });

  // Gets all quizes.
  useEffect(() => {
    getImpressions().then((data) => {
      setAllQuizzes(data.quizImpressions);
    });
  }, [components, selected]);

  // Handles to go to quiz analytics page
  const handleAnalysisClick = (quiz) => {
    setSelectedQuiz(quiz);
    setComponents({
      quizzesTable: false,
      quizAnalytics: true,
      deleteConfirm: false,
      editQuiz: false,
    });
  };

  // Handles copying the quiz test link
  const handleCopyingLink = async (quizId) => {
    let currentURL = window.location.href.replace(location.pathname, "");
    let link = `${currentURL}/test/${quizId}`;
    await window.navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard", {
      duration: 2000,
    });
  };

  // Handles deleting the quiz.
  const handleDelete = (quizId) => {
    setQuizDelete(quizId);
    setComponents({
      quizzesTable: true,
      quizAnalytics: false,
      deleteConfirm: true,
      editQuiz: false,
    });
  };

  // Handles Quiz edit
  const handleEdit = (quiz) => {
    setSelectedQuiz(quiz);
    setComponents({
      quizzesTable: true,
      quizAnalytics: false,
      deleteConfirm: false,
      editQuiz: true,
    });
  };

  // function to close modal.
  const onClose = () => {
    setQuizDelete("");
    setComponents({
      quizzesTable: true,
      quizAnalytics: false,
      deleteConfirm: false,
      editQuiz: false,
    });
  };

  // When confirm delete is clicked.
  const confirmDeleteBtn = () => {
    deleteQuiz(quizDelete).then((data) => {
      if (data.status == 200) {
        toast.success("Quiz deleted successfully!", {
          duration: 2000,
        });
        setComponents({
          quizzesTable: true,
          quizAnalytics: false,
          deleteConfirm: false,
          editQuiz: false,
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

  // Quiz edit section
  const quizEdit = (
    <MyModal>
      <QuizEdit quizId={selQuiz.quizId} onClose={onClose} />
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
                {allQuizzes.length != 0 ? (
                  allQuizzes.map((quiz, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {quiz.name.length > 9
                          ? quiz.name.substring(0, 10) + "..."
                          : quiz.name}
                      </td>
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
                          <img
                            src={editIcon}
                            alt="edit"
                            onClick={() => handleEdit(quiz)}
                          />
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
                  ))
                ) : (
                  <span
                    style={{
                      fontSize: "0.6em",
                    }}
                  >
                    No quiz present!
                  </span>
                )}
              </tbody>
            </table>
          </div>
          {components.deleteConfirm && confirmDeleteSection}
          <Toaster
            position="top-right"
            toastOptions={{
              className: "",
              style: {
                border: "1px solid #713200",
                padding: "0.5em",
                color: "#713200",
                fontSize: "0.2em",
              },
            }}
          />
          {components.editQuiz && quizEdit}
          <ToastContainer />
        </div>
      ) : (
        // Quiz Analytics component
        <QuizAnalysis setComponents={setComponents} quiz={selQuiz} />
      )}
    </div>
  );
}

export default Analytics;

// Quiz edit component
// <EditQuiz quizId={selQuiz.quizId} setComponents={setComponents} />
