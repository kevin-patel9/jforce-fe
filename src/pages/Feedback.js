import React, { useEffect, useState } from "react";
import { adminEditFeedbackApi, createFeedbackApi, getUserFeedBackListApi } from "../Api/FeebackApi";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../common/Apicall";

const Feedback = () => {
    const [description, setDescription] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [userFeedbackList, setUserFeedbackList] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const [editId, setEditId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (JSON.parse(getCookie("isAdmin")))
            navigate("/feedbackList");
    },[]);

    useEffect(() => {
        const getData = async () => {
            const response = await getUserFeedBackListApi();

            if (response?.success){
                setUserFeedbackList(response?.feedbackList);
            }
        };
        getData();
    },[refresh]);

    const handleCreateFeedback = async (e) => {
        e.preventDefault();

        if (description.length <= 6){
            setErrorMessage("Description length cannot be less than 6")
            setTimeout(() => {
                setErrorMessage("");
            },2000);
            return;
        }

        const response = await createFeedbackApi(description);
        
        if (response?.success){
            setSuccessMessage(response?.message);
            setRefresh(!refresh);
            setDescription("");
            setTimeout(() => {
                setSuccessMessage("");
            },3000)
        }
    };

    const handleEditFeedback = async (feedbackId) => {
        const response = await adminEditFeedbackApi(feedbackId, newDescription);

        if (response?.success){
            setRefresh(!refresh);
            setNewDescription("");
            setEditId("");
        }
    }

    const handleLogout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

        navigate("/login");
    };

    return (
        <div style={{ background: "lightgrey", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div 
                onClick={handleLogout}
                style={{ position: "absolute", top: 40, right: 40, background: "white", padding: 6, cursor: "pointer"}}>
                Logout
            </div>
            <div>
                <div style={{ 
                    background: "white", gap: 10, padding: 30, display: "flex", flexDirection: "column", alignItems: "center" 
                }}>
                    <p style={{ fontWeight: 600 }}>Feedback</p>
                    <div>
                        <p>Your FeedBack</p>
                        <input
                            style={{ height: 26, padding: 2 }} 
                            onChange={(e) => setDescription(e.currentTarget.value)} 
                            name="description" 
                            placeholder="Write your feedback here ..."
                            />
                    </div>
                    <button 
                        style={{ width: "86%", height: 26, background: "gray", cursor: "pointer" }}
                        onClick={handleCreateFeedback}>
                            Submit
                    </button>
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>
                <table style={{ textAlign: "center", background: "white" }}>
                        <thead>
                            <th>ID</th>
                            <th>Feedback</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </thead>
                        {userFeedbackList?.map((data, i) => (
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
                                            <button onClick={() => {
                                                setEditId(data._id)
                                                setNewDescription(data.description);
                                            }}>
                                                Edit
                                            </button>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default Feedback;
