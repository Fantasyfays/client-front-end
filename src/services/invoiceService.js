import axios from 'axios';

const API_URL = 'http://localhost:8080/api/invoices';
const LOGIN_URL = 'http://localhost:8080/users/login';

export const createInvoice = (invoiceData) => {
    return axios.post(`${API_URL}/create`, invoiceData);
};

export const loginUser = (loginData) => {
    return axios.post(LOGIN_URL, loginData, { withCredentials: true });
};
