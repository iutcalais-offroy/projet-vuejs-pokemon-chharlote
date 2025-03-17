import axios from 'axios';

const API_URL = 'https://pokemon-api-seyrinian-production.up.railway.app/users';


export const loginUser = async (email, password)  => {
    try {
        const response = await axios.post(`https://pokemon-api-seyrinian-production.up.railway.app/users/login`, {
            email,
            password
        });
        console.log('Réponse de l’API :', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
    }
};

export const createUser = async (email, password)  => {
    console.log('Données envoyées:', email, password);

    try {
        const response = await axios.post(`https://pokemon-api-seyrinian-production.up.railway.app/users`, {
            email,
            password
        });
        console.log('Réponse de l’API :', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de l’inscription :', error);
        throw error;
    }
};