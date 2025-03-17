<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import CardComponent from '../components/Card.component.vue';
import { getPokemons } from '../apis/pokemon.api.js';

const pokemons = ref([]);
const pokemonsDeck = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  try {
    pokemons.value = await getPokemons();
  } catch (error) {
    console.error("Erreur lors de la récupération des pokémons :", error);
  }
});

const filteredPokemons = computed(() => {
  return pokemons.value.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
const addToDeck = (pokemon) => {
  if (pokemonsDeck.length  == 20) {
    console.error('Il ne peut pas y avoir plus de 20 cartes dans un deck. ');
  }else {
    pokemonsDeck.value.push(pokemon);
    console.log(pokemonsDeck);
  }
};

const removeFromDeck = (pokemon) => {
  pokemonsDeck.value = pokemonsDeck.value.filter(p => p.pokedexId !== pokemon.pokedexId);
};


</script>

<template>

  <div class="deck_creation">

    <h3 class="deck_creation_title">Deck ({{ pokemonsDeck.length }} carte(s)) </h3>
    <n-input placeholder="Nom du deck..." :style="{ width: '50%' }" />
    <n-button type="primary">
      Sauvegarder
    </n-button>

    <n-empty
        class="noPokemon"
        size="huge"
        description="Aucun pokemon dans le deck"
        v-if="pokemonsDeck.length === 0">
    </n-empty>

    <div class="deck-container">
      <CardComponent
          v-for="pokemon in pokemonsDeck"
          :key="pokemon.pokedexId"
          :name="pokemon.name"
          :pokedexId="pokemon.pokedexId"
          :type="pokemon.type"
          :imageUrl="pokemon.imageUrl"
          :lifePoints="pokemon.lifePoints"
          :attackName="pokemon.attackName"
          :attackDamage="pokemon.attackDamage"
          :height="pokemon.height"
          :weight="pokemon.weight"
          class="card-item"
          @click="removeFromDeck(pokemon)"
      />
    </div>

  </div>

  <div class="separator"></div>

  <div class="list-cards">
    <div class="searchPokemon">
      <input class="searchPokemon_input"
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un Pokémon..."
      />
    </div>

    <div class="deck-container">
      <CardComponent
          v-for="pokemon in filteredPokemons"
          :key="pokemon.pokedexId"
          :name="pokemon.name"
          :pokedexId="pokemon.pokedexId"
          :type="pokemon.type"
          :imageUrl="pokemon.imageUrl"
          :lifePoints="pokemon.lifePoints"
          :attackName="pokemon.attackName"
          :attackDamage="pokemon.attackDamage"
          :height="pokemon.height"
          :weight="pokemon.weight"
          class="card-item"
          @click="addToDeck(pokemon)"

      />
    </div>
  </div>
</template>

<style scoped>
.deck-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.deckName_input {
  display: flex;
  margin-bottom: 30px;
  padding: 12px 20px;
  width: 80%;
  max-width: 500px;
  border: 2px solid #ccc;
  border-radius: 25px;
  background-color: #f9f9f9;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.noPokemon {
  margin: 30px 0;
}

.separator {
  height: 2px;
  background-color: #ccc;
  margin: 40px 0;
}

.searchPokemon_input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-bottom: 30px;
  padding: 12px 20px;
  width: 80%;
  max-width: 500px;
  border: 2px solid #ccc;
  border-radius: 25px;
  background-color: #f9f9f9;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.searchPokemon_input:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.6);
  outline: none;
}

.searchPokemon_input::placeholder {
  color: #888;
  font-style: italic;
}
.card-item {
  transition: transform 0.3s ease-in-out;
}

.card-item:hover {
  transform: scale(1.05);
}

</style>
