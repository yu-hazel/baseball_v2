import { defineStore } from 'pinia';
import { supabase } from '../supabase';
import { useGameStore } from './game';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        userName: '',
    }),
    actions: {
        async signInWithGitHub() {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    // redirectTo: window.location.origin,
                    redirectTo: 'https://yu-hazel.github.io/baseball_v2/', // ❗️배포용! 빌드할때 이걸로 설정해야함
                },
            });
            if (error) {
                console.error('Error signing in:', error);
            } else {
                this.user = data.user;
                this.userName = data.user.user_metadata.full_name || data.user.email;
            }
        },
        async signOut() {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out:', error);
            } else {
                this.user = null;
                this.userName = '';
                const gameStore = useGameStore();
                gameStore.$reset(); // 게임 스토어 상태 초기화
                window.location.reload();
            }
        },
        async checkAuth() {
            // console.log('checkAuth called');
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
            } else {
                this.user = data.user;
                this.userName = data.user?.user_metadata?.full_name || data.user?.email || '';
                console.log('checkAuth - 유저 아이디 :', this.user.id);
            }
        },
    },
});