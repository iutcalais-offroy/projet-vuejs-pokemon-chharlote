<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import CardComponent from '../components/Card.component.vue';
import { getPokemons } from '../apis/pokemon.api.js';

const pokemons = ref([]);
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
</script>

<template>
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
    />
  </div>
</template>

<style scoped>
.deck-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
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
