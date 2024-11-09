import axios from 'axios';

export function loginClient(data) {
    return axios.post('http://localhost:8080/users/login', data);
}

export function logout() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
