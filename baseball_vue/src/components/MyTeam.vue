<template>
    <v-container>
        <v-select v-model="favoriteTeam" :items="teamNames" label="마이 팀 선택" item-text="name" item-value="name"
            variant="outlined" density="compact" class="myTeamSelectBox"></v-select>
    </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '../supabase';

const user = ref(null);
const favoriteTeam = ref('');
const teams = [
    { name: '한화', className: 'hanwha' },
    { name: '두산', className: 'doosan' },
    { name: 'KIA', className: 'kia' },
    { name: '키움', className: 'kiwoom' },
    { name: 'kt', className: 'kt' },
    { name: 'LG', className: 'lg' },
    { name: '롯데', className: 'lotte' },
    { name: 'NC', className: 'nc' },
    { name: '삼성', className: 'samsung' },
    { name: 'SSG', className: 'ssg' },
];
const teamNames = teams.map(team => team.name);

const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
        console.error('Error fetching user:', error);
        return;
    }
    user.value = data.user;

    // Fetch the user's favorite team from the database
    const { data: userData, error: userError } = await supabase
        .from('baseball_users')
        .select('my_team')
        .eq('user_id', user.value.id)
        .limit(1);

    if (userError) {
        console.error('Error fetching user data:', userError);
        return;
    }

    if (userData && userData.length > 0) {
        favoriteTeam.value = userData[0].my_team;
        updateBackgroundClass(userData[0].my_team);
    } else {
        favoriteTeam.value = '';
    }
};

const saveFavoriteTeam = async () => {
    if (!user.value) return;

    console.log('Saving favorite team:', favoriteTeam.value);

    // 기존 데이터 삭제
    const { error: deleteError } = await supabase
        .from('baseball_users')
        .delete()
        .eq('user_id', user.value.id);

    if (deleteError) {
        console.error('Error deleting existing favorite team:', deleteError);
        return;
    }

    // 새로운 데이터 삽입
    const { error } = await supabase
        .from('baseball_users')
        .insert({ user_id: user.value.id, my_team: favoriteTeam.value });

    if (error) {
        console.error('Error inserting new favorite team:', error);
    } else {
        console.log('Favorite team updated successfully');
    }
};

const updateBackgroundClass = (teamName) => {
    const appWrap = document.querySelector('.v-application__wrap');
    if (!appWrap) return;

    // Remove previous team class
    appWrap.className = appWrap.className.split(' ').filter(c => !c.startsWith('team-')).join(' ');

    // Add new team class
    const selectedTeam = teams.find(team => team.name === teamName);
    if (selectedTeam) {
        appWrap.classList.add(`team-${selectedTeam.className}`, 'team-logo');
    }
};

onMounted(() => {
    fetchUser();
    // updateBackgroundClass();
});

watch(favoriteTeam, (newTeam) => {
    if (newTeam) {
        saveFavoriteTeam();
        updateBackgroundClass(newTeam);
    }
});
</script>
<style scoped>
data-v-0c3abb5c {
    padding-right: 0;
}
</style>