// Instalar axios para poder consumir dados da API
import axios from 'axios';

const api = axios.create({
baseURL: 'http://localhost:3000'
});


export default api; 