<script setup lang="ts">
defineProps({
  name: String,
  pokedexId: Number,
  type: String,
  imageUrl: String,
  lifePoints: Number,
  attackName: String,
  attackDamage: Number,
  height: Number,
  weight: Number,
});

const getTypeColor = (type: string) => {
  const typeColors: Record<string, string> = {
    Grass: '#78C850',
    Fire: '#F08030',
    Water: '#6890F0',
    Electric: '#F8D030',
    Psychic: '#F85888',
    Ice: '#98D8D8',
    Dragon: '#7038F8',
    Dark: '#705848',
    Fairy: '#EE99AC',
    Normal: '#A8A878',
    Fighting: '#C03028',
    Flying: '#A890F0',
    Poison: '#C183C1',
    Ground: '#E0C068',
    Rock: '#B8A038',
    Bug: '#A8B820',
    Ghost: '#705898',
    Steel: '#B8B8D0',
  };
  return typeColors[type]
};

</script>

<template>
  <n-card
      :style="{ borderColor: getTypeColor(type.name) }"
  >
    <template #cover>
      <img :src="imageUrl" alt="Pokemon Image">
    </template>
    <div class="info">
      <div class="info-head">
      <h3>{{ name }}</h3>
        <p class="pv">PV {{ lifePoints }}</p>
        <n-tag
            :bordered="false"
            class="type"
            :style="{ backgroundColor: getTypeColor(type.name) }"
        >
          {{ type.name }}
        </n-tag>

      </div>

      <!--      <p>Pokedex ID <span class="pokedexId">{{ pokedexId }}</span></p>-->
      <p class="info-body">Taille: {{ height }} | Poids: {{ weight }}</p>
      <n-tag :bordered="false" class="attack">
        {{ attackName }}
        <span class="damage">{{ attackDamage }} PV</span>
      </n-tag>
    </div>
  </n-card>
</template>

<style scoped>
.n-card {
  max-width: 300px;
  border: 2px solid;
  border-radius: 12px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}


.info-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
  padding-bottom: 16px;
  padding-left: 8px;
  padding-right: 8px;
}

.info-head h3 {
  margin: 0;
  flex-grow: 1;
}

.type {
  background-color: #f5f5f5;
  padding: 2px 8px;
  border-radius: 8px;
  font-weight: bold;
  white-space: nowrap;


}

.pv {
  margin: 0;
  white-space: nowrap;
  color:red;
  font-weight: bold;

}

.info-body {
  text-align: center;
  margin: 10px 0;
}
.attack{
  margin: 10px;
  text-align: center;
  display: flex;
  font-weight: bold;
  border-radius: 4px;

}
.damage {
  color: red;
  text-align: end;
  //display: flex;
}

</style>
