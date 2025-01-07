import axios from "axios";

const request = axios.create({
    baseURL: "https://social-client-fahad.ddnsfree.com/"
});

export default request;
