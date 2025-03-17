import axios from 'axios';

export const createDeck = async (name, cards)  => {
    console.log('Données envoyées:', name, cards);

    try {
        const response = await axios.post(`https://pokemon-api-seyrinian-production.up.railway.app/decks`, {
            name,
            cards
        });
        console.log('Réponse de l’API :', response.data);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création d\'un deck :', error);
        throw error;
    }
};