<template>
    <v-container>
        <v-row>
            <v-btn @click="handleAuth" :color="authStore.user ? 'transparent' : 'transparent'" size="x-small" icon>
                <v-icon>{{ authStore.user ? 'mdi-logout' : 'mdi-login' }}</v-icon>
            </v-btn>
            <!-- <v-btn icon="mdi-account" size="x-small"></v-btn> -->
        </v-row>
    </v-container>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { onMounted } from 'vue';

export default {
    setup() {
        const authStore = useAuthStore();

        const handleAuth = () => {
            if (authStore.user) {
                authStore.signOut();
            } else {
                authStore.signInWithGitHub();
            }
        };

        onMounted(() => {
            authStore.checkAuth();
        });

        return {
            authStore,
            handleAuth,
        };
    },
};
</script>

<style scoped>
.v-row {
    justify-content: flex-end;
}
</style>