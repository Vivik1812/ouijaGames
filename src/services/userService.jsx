import axios from 'axios';

const BASE_URL = 'https://ouijagames-back.onrender.com/api/users';

class UserService {

    login(usuario) {
        return axios.post(`${BASE_URL}/login`, usuario);
    }

    createUser(usuario){
        return axios.post(`${BASE_URL}`, usuario);
    }
}

export default new UserService();