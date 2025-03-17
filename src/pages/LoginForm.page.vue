<script setup>
import { ref } from 'vue';
import { loginUser, createUser } from '../apis/user.api.js';
import { useUserStore } from '../stores/userStore.js';
import {useRouter} from "vue-router";



const email = ref('');
const mdp = ref('');
const registerEmail = ref('');
const registerMdp = ref('');
const confirmMdp = ref('');
const activeTab  = ref('Inscription');

//
// const Login = async () => {
//   try {
//     const response = await loginUser(
//       email.value,
//       mdp.value
//     );
//     console.log('Utilisateur connecté :', response);
//   } catch (error) {
//     console.error('Erreur de connexion :', error);
//   }
// };
//
// const Create = async () => {
//   try {
//     if (registerMdp.value !== confirmMdp.value) {
//       console.error('Les mots de passe ne correspondent pas.');
//       return;
//     }
//
//     const response = await createUser(
//         registerEmail.value,
//         registerMdp.value
//     );
//     activeTab .value = 'Connexion';
//     console.log('Utilisateur créé :', response);
//   } catch (error) {
//     console.error('Erreur lors de l’inscription :', error);
//   }
// };

  const userStore = useUserStore();

  const Create = async () => {
  if (registerMdp.value !== confirmMdp.value) {
  console.error('Les mots de passe ne correspondent pas.');

    // window.location.href = '/deck-builder';

    return;
}

  await userStore.register(registerEmail.value, registerMdp.value);
};

  const Login = async () => {
  await userStore.login(email.value, mdp.value);

  activeTab.value= 'Connexion';

};
</script>


<template>
  <n-card>
    <n-tabs
      v-model:value="activeTab "
      class="card-tabs"
      size="large"
      animated
      pane-wrapper-style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >

      <n-tab-pane name="Connexion" tab="Connexion">
        <n-form>
          <n-form-item-row label="Email">
            <n-input v-model:value="email" placeholder="Entrez votre email"/>
          </n-form-item-row>
          <n-form-item-row label="Mot de passe">
            <n-input type="password" v-model:value="mdp" placeholder="Entrez votre mot de passe"/>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong @click="Login">
          Connexion
        </n-button>
        <p>Pas de compte ? <a @click="activeTab = 'Inscription'">S'inscrire</a></p>
      </n-tab-pane>

      <n-tab-pane name="Inscription" tab="Inscription">
        <n-form>
          <n-form-item-row label="Email">
            <n-input v-model:value="registerEmail" placeholder="Entrez votre email"/>
          </n-form-item-row>
          <n-form-item-row label="Mot de passe">
            <n-input type="password" v-model:value="registerMdp" placeholder="Entrez votre mot de passe"/>
          </n-form-item-row>
          <n-form-item-row label="Valider mot de passe">
            <n-input type="password" v-model:value="confirmMdp" placeholder="Confirmez votre mot de passe"/>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong @click="Create">
          Inscription
        </n-button>
        <p>Déjà inscrit ? <a @click="activeTab = 'Connexion'">Se connecter</a></p>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>



<style scoped>
.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}
button {
  background-color: #4CAF50;
  color: black;
  font-weight: bold;
}
</style>

