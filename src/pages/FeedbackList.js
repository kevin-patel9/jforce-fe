import React, { useEffect, useState } from "react";
import { adminEditFeedbackApi, deleteFeedbackApi, getFeedbackListForAdminApi } from "../Api/FeebackApi";
import "./feedbackList.css"
import { useNavigate } from "react-router-dom";

const FeedbackList = () => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const [editId, setEditId] = useState("");

    useEffect(() => {
        const getData = async () => {
            const response = await getFeedbackListForAdminApi();
            setFeedbackData(response.feedbackList);
        }
        getData();
    },[refresh]);

    const handleDeleteFeedback = async (feedbackId) => {
        const response = await deleteFeedbackApi(feedbackId);

        if (response?.success){
            setRefresh(!refresh);
        }
    }

    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

        navigate("/login");
    };

    const handleEditFeedback = async (feedbackId) => {
        const response = await adminEditFeedbackApi(feedbackId, newDescription);

        if (response?.success){
            setRefresh(!refresh);
            setNewDescription("");
            setEditId("");
        }
    }

    return (
        <div style={{ background: "lightgrey", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <div 
                style={{ background: "white", padding: 20, width: "80%", display: "flex", flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <table style={{ textAlign: "center" }}>
                        <thead>
                            <th>ID</th>
                            <th>Feedback</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </thead>
                    {feedbackData?.map((data, i) => (
                            <tbody>
                                <tr style={{height:"40px"}}>
                                    <td>{i + 1}</td>
                                    {editId === data._id ?
                                        <td>
                                            <input
                                                value={newDescription} 
                                                placeholder="Change FeedBack"
                                                onChange={(e) => setNewDescription(e.currentTarget.value)}
                                            />
                                        </td> :
                                        <td>{data.description}</td>
                                    }
                                    <td>{String(data.createdAt).substring(0, 10)}</td>
                                    <td>
                                        <button>View</button>
                                        {editId === data._id ?
                                            <button onClick={() => handleEditFeedback(data._id)}>Save</button>
                                            :
                                            <button onClick={() => setEditId(data._id)}>Edit</button>
                                        }
                                        <button onClick={() => handleDeleteFeedback(data._id)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                    ))}
                </table>
                <p onClick={handleLogout} style={{ textAlign: "center", cursor: "pointer" }}>Logout</p>
            </div>
        </div>
    );
}

export default FeedbackList;
