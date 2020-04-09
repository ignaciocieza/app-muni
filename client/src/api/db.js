import axios from 'axios';

/**
 * Crea base de datos de usuarios.
 */
export default axios.create({
    baseURL:'https://heroku-jsonserver-muni.herokuapp.com'
});

