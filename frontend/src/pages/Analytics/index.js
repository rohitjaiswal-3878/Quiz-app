import React, { useEffect, useState } from "react";
import "./index.css";
import deleteIcon from "../../assets/delete.png";
import shareIcon from "../../assets/share.png";
import editIcon from "../../assets/edit.png";
import { getImpressions } from "../../apis/dashboard";

function Analytics() {
  const [allQuizzes, setAllQuizzes] = useState([]);

  useEffect(() => {
    getImpressions().then((data) => setAllQuizzes(data.quizImpressions));
  }, []);

  return (
    <div className="analytics">
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
                <tr>
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
                      <img src={deleteIcon} alt="delete" />
                      <img src={shareIcon} alt="shar" />
                    </div>
                  </td>
                  <td className="last-col-table">
                    <span>Question wise Analysis</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
