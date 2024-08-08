<template>
  <v-app>
    <v-container>
      <div class="header">
        <div class="headerTitle">
          <div>
            <h2>내 꿈은 승리요정
              <span>
                ver.2
              </span>
            </h2>
            <p v-if="authStore.user" class="userWelcome">안녕하세요, {{ authStore.userName }} 님!
              <v-icon @click="toggleMyTeam" color="grey-darken-3" size="x-small" class="tooltipBt">
                mdi-baseball
              </v-icon>
              <v-card v-if="showMyTeam" class="myTeamCard">
                <v-card-text>
                  <MyTeam />
                </v-card-text>
              </v-card>
            </p>
          </div>
          <div class="recordHistory">
            <p><v-icon icon="mdi-progress-pencil"></v-icon> 등록한 기록</p>
            <p>{{ authStore.user ? gameStore.games.length : 0 }}건</p>
          </div>
        </div>
        <div class="loginWrapper">
          <div>
            <Login />
            <!-- <span v-if="authStore.user" class="userWelcome">안녕하세요 {{ authStore.userName }} 님!</span> -->
          </div>
          <!-- <MyTeam /> -->
        </div>
      </div>
      <v-divider class="my-4"></v-divider>
      <Main />
    </v-container>
  </v-app>
</template>

<script setup>
import Login from './components/Login.vue';
import Main from './pages/Main.vue';
import MyTeam from './components/MyTeam.vue';
import { useAuthStore } from './stores/auth';
import { useGameStore } from './stores/game';
import { ref, watch, onMounted } from 'vue';
import { supabase } from './supabase';

const authStore = useAuthStore();
const gameStore = useGameStore();
const showTooltip = ref(false);
const showMyTeam = ref(false);

const toggleMyTeam = () => {
  showMyTeam.value = !showMyTeam.value;
};

const teamMapping = {
  '한화': 'hanwha',
  '두산': 'doosan',
  'KIA': 'kia',
  '키움': 'kiwoom',
  'kt': 'kt',
  'LG': 'lg',
  '롯데': 'lotte',
  'NC': 'nc',
  '삼성': 'samsung',
  'SSG': 'ssg'
};

const updateBackgroundClass = (team) => {
  const appWrap = document.querySelector('.v-application__wrap');
  if (!appWrap) return;

  // 기존 클래스 제거
  // console.log('Updating background class for team:', team);
  appWrap.className = appWrap.className.split(' ').filter(c => !c.startsWith('team-')).join(' ');

  const teamClass = teamMapping[team];
  if (teamClass) {
    appWrap.classList.add('team-logo', `team-${teamClass}`);
    // console.log('Updated className:', appWrap.className);
  } else {
    console.error('Unknown team name:', team);
  }
};

const fetchUserTeam = async (userId) => {
  const { data, error } = await supabase
    .from('baseball_users')
    .select('my_team')
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('Error fetching user team:', error);
    return null;
  }
  return data.my_team;
};

const initBackgroundClass = async () => {
  await authStore.checkAuth(); // 사용자 정보를 확인
  if (authStore.user) {
    const userTeam = await fetchUserTeam(authStore.user.id); // 사용자 ID로 팀 정보를 가져옴
    updateBackgroundClass(userTeam); // 사용자 정보를 기반으로 배경 클래스 설정
  }
};

watch(() => authStore.user, async (newUser) => {
  if (newUser) {
    const userTeam = await fetchUserTeam(newUser.id); // 사용자 ID로 팀 정보를 가져옴
    if (userTeam) {
      updateBackgroundClass(userTeam);
    }
  }
});

onMounted(async () => {
  await initBackgroundClass();
  if (authStore.user?.id) {
    await gameStore.fetchGames(authStore.user.id); // 사용자 ID로 게임 데이터를 가져옴
  }
});
// gameStore.fetchGames();
</script>

<style>
@import 'vuetify/styles';

.v-application__wrap {
  background: linear-gradient(to top, #e3e3e3, #ebebeb, #ffffff);
}
.team-logo::before {
  content: "";
  position: fixed;
  top: -10vh;
  left: 40vw;
  width: 700px;
  height: 700px;
  aspect-ratio: 1;
  background-size: contain !important;
  opacity: 0.3;
  pointer-events: none;
}
.team-hanwha::before {
  background: url('@/assets/hanwha_logo.svg') no-repeat;

}
.team-doosan::before {
  background: url('@/assets/doosan_logo.svg') no-repeat;
  scale: 0.8;
  top: -20vh;
}
.team-kia::before {
  background: url('@/assets/kia_logo.svg') no-repeat;
  scale: 0.8;
  left: 30vw;
}
.team-nc::before {
  background: url('@/assets/nc_logo.svg') no-repeat;
  scale: 0.9;
}
.team-lotte::before {
  background: url('@/assets/lotte_logo.svg') no-repeat;
  scale: 0.8;
  top: -17vh;
}
.team-samsung::before {
  background: url('@/assets/samsung_logo.svg') no-repeat;
  scale: 0.8;
  top: -17vh;
  left: 35vw;
}
.team-lg::before {
  background: url('@/assets/lg_logo.svg') no-repeat;
  scale: 0.8;
}
.team-kt::before {
  background: url('@/assets/kt_logo.svg') no-repeat;
  top: -20vh;
  scale: 0.8;
}
.team-ssg::before {
  background: url('@/assets/ssg_logo.svg') no-repeat;
  top: -7vh;
  left: 50vw;
}
.team-kiwoom::before {
  background: url('@/assets/kiwoom_logo.svg') no-repeat;
  scale: 0.8;
  top: -15vh;
  left: 35vw;
}
.header {
  display: flex;
  justify-content: space-between;
  position: relative;
  height: 150px;
}
h2 {
  font-family: 'Freesentation-9Black';
}
.headerTitle {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.headerTitle p {
  display: flex;
  align-items: center;
}
.recordHistory {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
}
.recordHistory p:first-of-type {
  display: flex;
  gap: 3px;
  font-size: 14px;
  color: #474747;
}
.recordHistory p:last-of-type {
  font-size: 16px;
  font-weight: 600;
  padding-left: 27px;
}
.loginWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tooltipBt {
  margin-left: 3px;
}
.myTeamCard {
  position: absolute !important;
  top: 75px;
  left: 150px;
  z-index: 1000;
  height: 100px;
  backdrop-filter: blur(5px) !important;
  background-color: rgba(255, 255, 255, 0.49) !important;
}
</style>