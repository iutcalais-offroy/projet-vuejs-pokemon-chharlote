import { defineStore } from 'pinia';
import { loginUser, createUser } from '../apis/user.api.js';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),

    actions: {
        async register(email, password) {
            try {
                await createUser( email, password );
                console.log('Utilisateur créé avec succès');
            } catch (error) {
                console.error('Erreur lors de l’inscription :', error);
            }
        },

        async login(email, password) {

            try {
                const response = await loginUser( email, password );
                this.user = response.user;
                this.token = response.token;

                localStorage.setItem('token', response.token);
                localStorage.setItem('userId', response.user.id);
                window.location.href = '/deck-builder';

                // const router = useRouter();
                //
                // await router.push('deck-builder');

            } catch (error) {
                console.error('Erreur lors de la connexion :', error);
            }
        },

    }
});
