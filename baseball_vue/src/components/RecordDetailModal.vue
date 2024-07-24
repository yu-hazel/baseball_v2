<template>
    <v-dialog v-model="gameStore.showDetailModal" max-width="600px">
        <v-card class="detailModal">
            <v-card-title>
                <span class="headline">기록 보기</span>
            </v-card-title>
            <v-card-text v-if="gameStore.selectedRecord">
                <v-form>
                    <v-text-field label="DATE" v-model="gameStore.selectedRecord.date" :readonly="!isEditing"
                        variant="outlined"></v-text-field>
                    <div class="teamWrapper">
                        <v-text-field label="AWAY TEAM" v-model="gameStore.selectedRecord.away_team" :readonly="!isEditing"
                            variant="outlined"></v-text-field> VS
                        <v-text-field label="HOME TEAM" v-model="gameStore.selectedRecord.home_team" :readonly="!isEditing"
                            variant="outlined"></v-text-field>
                    </div>
                    <div class="scoreWrapper">
                        <v-text-field label="AWAY SCORE" v-model="gameStore.selectedRecord.away_score"
                            :readonly="!isEditing" type="number" variant="outlined"></v-text-field> :
                        <v-text-field label="HOME SCORE" v-model="gameStore.selectedRecord.home_score"
                            :readonly="!isEditing" type="number" variant="outlined"></v-text-field>
                    </div>
                    <v-textarea rows="10" label="COMMENTS" v-model="gameStore.selectedRecord.comment" :readonly="!isEditing"
                        variant="outlined"></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">닫기</v-btn>
                <v-btn v-if="!isEditing" color="green darken-1" text @click="edit">수정</v-btn>
                <v-btn v-if="isEditing" color="green darken-1" text @click="save">저장</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { ref } from 'vue';
import { useGameStore } from '../stores/game';

export default {
    setup() {
        const gameStore = useGameStore();
        const isEditing = ref(false);

        const close = () => {
            gameStore.closeDetail();
            isEditing.value = false;
        };

        const edit = () => {
            isEditing.value = true;
        };

        const save = async () => {
            await gameStore.updateGame(gameStore.selectedRecord);
            gameStore.closeDetail();
            isEditing.value = false;
        };

        return {
            gameStore,
            isEditing,
            close,
            edit,
            save,
        };
    },
};
</script>

<style scoped>
.detailModal {
    border-radius: 10px !important;
}
.teamWrapper {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
}
.scoreWrapper {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center
}
.v-dialog > .v-overlay__content > .v-card {
    padding: 10px !important;
}
</style>