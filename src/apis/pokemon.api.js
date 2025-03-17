import axios from 'axios';

export const getPokemons = async () => {
    try {
        const response = await axios.get('https://pokemon-api-seyrinian-production.up.railway.app/pokemon-cards');
        const pokemons = await Promise.all(
            response.data.map(async (pokemon) => {
                const attack = await getAttack(pokemon.attackId);
                return {
                    name: pokemon.name,
                    pokedexId: pokemon.pokedexId,
                    type: pokemon.type,
                    imageUrl: pokemon.imageUrl,
                    lifePoints: pokemon.lifePoints,
                    attackId: attack.id,
                    attackName: attack.name,
                    attackDamage: attack.damages,
                    height: pokemon.height,
                    weight: pokemon.weight,
                };
            })
        );
        return pokemons;
    } catch (error) {
        console.error('Erreur lors de la récupération des pokemons:', error);
        throw error;
    }
};

export const getAttack = async (attackId) => {
    try {
        const response = await axios.get(`https://pokemon-api-seyrinian-production.up.railway.app/attacks/${attackId}`);
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'attaque du pokemon:', error);
        throw error;
    }
};
