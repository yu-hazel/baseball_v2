<template>
    <v-dialog v-model="gameStore.showModal" max-width="600px" @click:outside="close">
        <v-card>
            <v-card-title>
                <span class="headline">경기 기록하기</span>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field label="경기 날짜" v-model="date" type="date" @input="fetchSchedules"
                        class="selectDate"></v-text-field>
                    <v-select v-if="scheduleItemsNames.length > 0" :items="scheduleItemsNames" label="경기 선택"
                        v-model="selectedSchedule" @change="setTeams"></v-select>
                    <p v-if="dateSelected && scheduleItemsNames.length === 0" class="noGames">해당 날짜에는 경기 일정이 없습니다.</p>
                    <div class="d-flex align-center mb-4">
                        <v-text-field v-model="awayScore" type="number" class="mr-2" style="max-width: 60px;"
                            variant="underlined"></v-text-field>
                        <span>:</span>
                        <v-text-field v-model="homeScore" type="number" class="ml-2" style="max-width: 60px;"
                            variant="underlined"></v-text-field>
                    </div>
                    <v-textarea rows="10" label="이 경기는 어땠나요?" v-model="comment"></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">취소</v-btn>
                <v-btn color="blue darken-1" text @click="save">저장</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, watch, toRaw } from 'vue';
import { useGameStore } from '../stores/game';
import { supabase } from '../supabase';

const gameStore = useGameStore();
const date = ref('');
const selectedSchedule = ref(null);
const scheduleItemsNames = ref([]);
const awayScore = ref(0);
const homeScore = ref(0);
const comment = ref('');
const selectedDate = ref(null);
const dateSelected = ref(false);

// const allowedDates = (date) => {
//     const day = new Date(date).getDay();
//     // 월요일(0)인 날짜는 선택 불가능
//     return day !== 1;
// };

watch(selectedDate, async (newDate) => {
    if (newDate) {
        await fetchSchedules(newDate);
    }
});

const close = () => {
    gameStore.toggleModal();
};

const fetchSchedules = async (event) => {
    const selectedDate = event.target.value;
    dateSelected.value = true;
    // console.log('Selected Date:', selectedDate);
    const dateObj = new Date(selectedDate);
    const formattedDate = `${('0' + (dateObj.getMonth() + 1)).slice(-2)}.${('0' + dateObj.getDate()).slice(-2)}(${['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()]})`;
    // console.log('Formatted Date:', formattedDate);
    scheduleItemsNames.value = [];
    await gameStore.fetchKboGames(formattedDate);
    const rawItems = toRaw(gameStore.scheduleItems);
    scheduleItemsNames.value = rawItems.map(item => item.name);
    // console.log('경기 일정 선택지:', scheduleItemsNames.value);
    selectedSchedule.value = null;
};

const setTeams = () => {
    if (selectedSchedule.value !== null) {
        const schedule = gameStore.scheduleItems.find(
            s => `${s.away_team} vs ${s.home_team}` === selectedSchedule.value
        );
        if (schedule) {
            gameStore.record.homeTeam = schedule.home_team;
            gameStore.record.awayTeam = schedule.away_team;
        }
    }
};

const save = async () => {
    if (!selectedSchedule.value) {
        console.error('Error: No game selected');
        return;
    }
    const selectedGame = gameStore.scheduleItems.find(
        s => `${s.away_team} vs ${s.home_team}` === selectedSchedule.value
    );

    const game = {
        date: date.value,
        away_team: selectedGame.away_team,
        home_team: selectedGame.home_team,
        away_score: awayScore.value,
        home_score: homeScore.value,
        comment: comment.value,
    };

    const { error } = await supabase.from('baseball02').insert([game]);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        await gameStore.fetchGames();
        close();
        window.location.reload();
    }
};

watch(
    () => gameStore.showModal,
    (newVal) => {
        if (newVal) {
            date.value = '';
            selectedSchedule.value = null;
            scheduleItemsNames.value = [];
            awayScore.value = 0;
            homeScore.value = 0;
            comment.value = '';
        }
    }
);
</script>

<style scoped>
.v-text-field .v-input__details {
    display: none;
}
.mb-4 {
    margin-top: 16px;
    justify-content: center;
}
.v-dialog > .v-overlay__content > .v-card {
    padding: 10px;
}

.noGames {
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: rgb(106, 106, 106);
}
</style>