<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CardComponent from '../components/Card.component.vue';
import { getPokemons } from '../apis/pokemon.api.js';

const pokemons = ref([]);

onMounted(async () => {
  try {
    pokemons.value = await getPokemons();
  } catch (error) {
    console.error("Erreur lors de la récupération des pokémons :", error);
  }
});
</script>

<template>
  <div class="deck-container">
    <CardComponent
        v-for="pokemon in pokemons"
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
    />
  </div>
</template>

<style scoped>
.deck-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
