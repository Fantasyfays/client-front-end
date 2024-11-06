import axios from 'axios';

const API_URL = 'http://localhost:8080/api/invoices';

export const createInvoice = (invoiceData) => {
    return axios.post(`${API_URL}/create`, invoiceData);
};
