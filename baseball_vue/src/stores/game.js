import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useGameStore = defineStore('game', {
    state: () => ({
        games: [],
        kboGames: [],
        scheduleItems: [],
        showModal: false,
        selectedGame: null,
        record: {
            homeTeam: '',
            awayTeam: '',
        },
        showDetailModal: false,
        selectedRecord: null,
    }),
    actions: {
        async addGame(game) {
            this.games.push(game);
        },
        toggleModal() {
            this.showModal = !this.showModal;
        },
        async fetchGames(userId) {
            if (!userId) {
                console.error('User ID is undefined');
                return;
            }
            // console.log('fetchGames 메서드 실행, 유저 아이디 :', userId);
            const { data, error } = await supabase
                .from('baseball02')
                .select('*')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching games:', error);
            } else {
                // 날짜를 기준으로 정렬
                this.games = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            }
        },
        async fetchKboGames(date) {
            const { data, error } = await supabase
                .from('kbo')
                .select('*')
                .eq('date', date);

            if (error) {
                console.error('Error fetching kbo games:', error);
            } else {
                this.kboGames = data;
                this.scheduleItems = data.map(item => ({
                    name: `${item.away_team} vs ${item.home_team}`,
                    ...item,
                }));
            }
        },
        selectGame(game) {
            this.selectedGame = game;
        },
        openDetail(record) {
            this.selectedRecord = record;
            this.showDetailModal = true;
        },
        closeDetail() {
            this.selectedRecord = null;
            this.showDetailModal = false;
        },
        async deleteGame(id) {
            const { error } = await supabase
                .from('baseball02')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting game:', error);
            } else {
                this.games = this.games.filter(game => game.id !== id);
            }
        },
        async updateGame(record) {
            const { error } = await supabase
                .from('baseball02')
                .upsert([record]);

            if (error) {
                console.error('Error updating game:', error);
            } else {
                const index = this.games.findIndex(game => game.id === record.id);
                if (index !== -1) {
                    this.games[index] = record;
                }
                this.games.sort((a, b) => new Date(a.date) - new Date(b.date));
            }
        },
    },
});