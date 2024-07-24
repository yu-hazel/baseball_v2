<template>
    <v-container class="cardContainer">
        <v-row v-if="!authStore.user" class="beforeLoginText">
            <p>나만의 야구 기록을 추가해보세요!✏️</p><br>
            <p>현재는 GitHub을 이용한 로그인만 지원하고 있습니다.🤗</p><br>
            <!-- <p>KBO 경기일정 크롤링을 통해<br>입력 로직을 간소화한 버전입니다.</p> -->
        </v-row>
        <v-row v-else>
            <v-col cols="12" v-for="game in gameStore.games" :key="game.id" class="mb-2">
                <v-card elevation="8" class="card">
                    <div class="cardTitleWrapper">
                        <!-- <v-card-title @click="openDetail(game)" class="cardTitle">
                            {{ formatGameTitle(game) }}
                        </v-card-title> -->
                        <v-card-title @click="openDetail(game)" class="cardTitle">
                            <span>{{ game.away_team }}</span> <span class="cardVs">vs</span> <span>{{ game.home_team
                                }}</span>
                        </v-card-title>
                        <!-- <span class="cardDate">{{ formatDate(game.date) }}</span> -->
                        <span class="cardDate">
                            <span class="cardDateMonth">{{ formatDate(game.date).month }}월</span>
                            <span class="cardDateDay">{{ formatDate(game.date).day }}</span>
                        </span>
                    </div>
                    <v-card-text @click="openDetail(game)">
                        {{ game.comment }}
                    </v-card-text>
                    <v-card-actions>
                        <!-- <span class="createdDate">{{ formatDate(game.created_at) }}</span> -->
                        <v-btn icon @click="deleteGame(game.id)" class="deleteBt">
                            <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <RecordDetailModal />
        </v-row>
    </v-container>
</template>

<script>
import { useGameStore } from '../stores/game';
import { useAuthStore } from '../stores/auth';
import RecordDetailModal from './RecordDetailModal.vue';
import { onMounted, watch } from 'vue';

export default {
    components: {
        RecordDetailModal,
    },
    setup() {
        const gameStore = useGameStore();
        const authStore = useAuthStore();

        const formatGameTitle = (game) => {
            return `${game.away_team} <span class="cardVs">vs</span> ${game.home_team}`;
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            // return `${month}/${day}`;
            return { month, day };
        };

        const openDetail = (game) => {
            gameStore.openDetail(game);
        };

        const deleteGame = async (id) => {
            if (confirm('정말 삭제하시겠습니까?')) {
                await gameStore.deleteGame(id);
            }
        };

        const fetchUserGames = async () => {
            // await authStore.checkAuth();
            if (authStore.user) {
                await gameStore.fetchGames(authStore.user.id);
            }
        };

        onMounted(() => {
            // fetchUserGames();
            if (authStore.user) {
                gameStore.fetchGames(authStore.user.id);
            }
        });

        watch(() => authStore.user, (newUser) => {
            if (newUser) {
                fetchUserGames();
            }
        });

        return {
            gameStore,
            authStore,
            formatDate,
            formatGameTitle,
            openDetail,
            deleteGame,
        };
    },
};
</script>

<style scoped>
.card {
    border-radius: 8px;
    backdrop-filter: blur(5px);
    background-color: #ffffff7d;
}
.cardTitleWrapper {
    display: flex;
    justify-content: space-between;
    /* padding: 0 10px; */
}
.cardDate {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Pretendard-Regular';
    right: 15px;
    top: 24px;
    color: #999;
}
.cardDateMonth {
    font-size: 20px;
    letter-spacing: 0px;
    position: absolute;
    white-space: nowrap;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.3;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
}
.cardDateDay {
    font-size: 80px;
    font-weight: 900;
    opacity: 0.15;
}
.cardTitle {
    font-size: 18px;
    font-weight: 700;
    padding-top: 15px;
}
.v-card-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    overflow: hidden;
    text-overflow: ellipsis;
    /* height: 8em; */
    line-height: 1.5em;
}
.v-card-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* gap: 30px; */
    width: 100%;
}
.createdDate {
    display: flex;
    margin-left: 10px;
    font-size: 12px;
    color: #777;
}
.deleteBt {
    color: #838383;
}
.beforeLoginText {
    display: flex;
    height: 50vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* padding-top: 50px; */
    text-align: center;
    position: relative;
    font-weight: 600;
}
.beforeLoginText::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background: url('@/assets/kbo.svg') no-repeat center center;
    background-size: contain;
    opacity: 0.2;
}
</style>
<style>
.cardVs {
    font-size: 16px;
    font-weight: 400;
}
</style>