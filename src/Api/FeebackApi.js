import { deleteData, getData, postData } from "../common/Apicall"

export const createFeedbackApi = (description) => {
    return postData("/api/v1/feedback/createFeedback", { description });
};

export const adminEditFeedbackApi = (feedBackId, description) => {
    return postData("/api/v1/feedback/adminEditFeedback", { feedBackId, description });
};

export const getFeedbackListForAdminApi = () => {
    return getData("/api/v1/feedback/getFeedbackListForAdmin");
};

export const getUserFeedBackListApi = () => {
    return getData("/api/v1/feedback/getUserFeedBackList");
};

export const deleteFeedbackApi = (feedbackId) => {
    return deleteData("/api/v1/feedback/deleteFeedback", { feedbackId });
};