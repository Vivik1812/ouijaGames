import axios from 'axios';

const BASE_URL = 'https://ouijagames-back.onrender.com/api/products';


class JuegosService {
    async getAllJuegos() {
        try {
            const response = await axios.get(BASE_URL);
            console.log(response.data);
            
            return response.data;
        } catch (error) {
            console.error('Error al obtener juegos:', error);
            throw error;
        }
    }

    async createJuego(faccionData) {
        try {
            const response = await axios.post(BASE_URL, faccionData, {
                headers: {
                'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear juego:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateJuego(id, data) {
        try {
            const response = await axios.patch(`${BASE_URL}/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar juego:', error);
            throw error;
        }
    }

    async deleteJuego(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar juego:', error);
            throw error;
        }
    }
}

export default new JuegosService();