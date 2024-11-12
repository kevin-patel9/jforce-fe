import { postData } from "../common/Apicall"

export const registerApi = (userId, email, password) => {
    return postData("/api/v1/user/register", { userId, email, password });
};

export const loginApi = (userId, password) => {
    return postData("/api/v1/user/login", { userId, password });
};