import axios from 'axios';

/**
 * Crea base de datos de usuarios.
 */
export default axios.create({
    baseURL:'http://localhost:3001'
});