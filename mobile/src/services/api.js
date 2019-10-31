import axios from 'axios';
// 10.0.2.2 emulador andr

const api = axios.create({
    baseURL: 'http://192.168.0.107:3000'
});

export default api;