<template>
    <v-container>
        <div class="listContainer">
            <GameList />
        </div>
        <div class="blurOverlay"></div>
        <v-btn icon="mdi-plus" size="large" class="recordBt" @click="gameStore.toggleModal" elevation="8"></v-btn>
        <GameRecordModal />
    </v-container>
</template>

<script>
import { useGameStore } from '../stores/game';
import GameRecordModal from '@/components/GameRecordModal.vue';
import GameList from '@/components/GameList.vue';

export default {
    components: {
        GameRecordModal,
        GameList,
    },
    setup() {
        const gameStore = useGameStore();
        gameStore.fetchGames();

        return {
            gameStore,
        };
    },
};
</script>

<style scoped>
.recordBt {
    position: fixed;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}
.blurOverlay {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100px;
    pointer-events: none;
    z-index: 1000;
    backdrop-filter: blur(5px);
    background: linear-gradient(to top, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0));
    box-shadow: 0px -20px 20px -20px rgba(195, 195, 195, 0.5);
}
.listContainer {
    padding-bottom: 100px;
}
.v-container.v-locale--is-ltr {
    padding: 0;
}
</style>

<style>
.mdi-plus::before {
    color: rgb(58, 58, 58) !important;
}
</style>