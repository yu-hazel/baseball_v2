# ⚾️ 내 꿈은 승리요정 ver.2

#### 이겨도, 져도 화가 나는 야구 찐팬들을 위한 야구 기록 웹 앱

이 프로젝트는 'Vue.js를 활용한 프로그레시브 웹 앱(PWA) 개발자 양성과정[14th]' 수강을 바탕으로 제작한 개인 포트폴리오 프로젝트입니다. <br>
초기 버전(ver.1)에서는 모든 항목을 수기로 입력하고 로컬 스토리지에 저장하는 로직으로 이루어졌습니다. <br>
해당 디벨롭 버전(ver.2)에서는 **Supabase**를 통한 데이터 관리로 반영구적인 데이터 관리를 구현하고, 사용자의 입력 피로도를 감소하는 데 주 목적을 두어 개발하였습니다.

**Vite + Vue.js**를 사용하여 빌드 과정을 간소화하였으며, **Vuetify**를 활용하여 UI 커스텀 비용을 최소화했습니다. <br>
최종 배포는 **PWA**를 통해 웹 앱을 데스크탑 및 모바일 기기에서 다운로드하여 사용할 수 있도록 하였습니다.


<br>


## 개요 ✋🏻

- 프로젝트 이름 : 내 꿈은 승리요정
- 진행 기간 : 2024.07.09 ~ 2024.07.19
- 기여도 : 100% (개인 프로젝트)
- 배포 주소 : https://yu-hazel.github.io/baseball_v2/

<br>

## 기술 스택 🥞

### Development

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Vuetify](https://img.shields.io/badge/Vuetify-1867C0?style=for-the-badge&logo=vuetify&logoColor=AEDDFF)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

### Database

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### Environment

![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

<br>


## 미리 보기 📋

![승리요정](https://github.com/user-attachments/assets/0b11976f-3899-46a4-8d89-6fe32a771ee9) |![승리요정02](https://github.com/user-attachments/assets/10e8306a-7f84-487a-8270-0cec5c1e0e53)
--- | --- |

<br>


## 주요 기능 🐳

- Supabase를 통한 로그인, 데이터 CRUD
- Python, BeautifulSoup으로 크롤링한 kbo 경기 일정을 바탕으로 기록 등록
- 마이 팀 설정에 따른 배경 이미지(팀 로고) 연동

<br>


## 트러블 슈팅 ☄️

1. **배경 이미지가 로드되지 않음**
  - 문제 상황
     : 각 팀에 대한 배경 이미지가 제대로 로드되지 않음
  - 원인
     : updateBackgroundClass 함수가 사용자 인증(로그인) 후 제대로 호출되지 않고, 사용자의 '마이 팀'에 해당하는 팀 이름이 클래스 이름에 매핑되지 않았음
  - 최종 해결을 위한 시행착오
    - updateBackgroundClass 함수가 올바르게 호출되는지 콘솔 로그를 통하여 확인
    - CSS 클래스 이름이 올바르게 적용되는지 확인
    - 팀 이름이 정확하게 매핑되는지 확인
  - 해결 방법
     : watch를 사용하여 사용자가 로그인하거나 사용자의 마이 팀이 변경될 때마다 updateBackgroundClass 함수가 호출되도록 수정

```javascript
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
  appWrap.className = appWrap.className.split(' ').filter(c => !c.startsWith('team-')).join(' ');

  const teamClass = teamMapping[team];
  if (teamClass) {
    appWrap.classList.add('team-logo', `team-${teamClass}`);
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
  await gameStore.fetchGames();
});
```

  - 느낀 점
     : 상태 변화를 감지하는 Vue의 watch, 그리고 onMounted와 같은 생명주기 훅의 적절한 활용 방법을 다시 한 번 숙지하게 되었음.

    <br>

 2. **사용자별 데이터 가져오기**
  - 문제 상황 : 로그인 후 기록 데이터를 가져오는 과정에서 baseball02 테이블의 모든 레코드를 가져오는 상황 발생
  - 원인 : 개발 과정에서 다른 사용자의 데이터를 고려하지 않아 user id를 통한 레코드 필터링 과정을 누락함
  - 해결 방법 : stores/game.js의 fetchGames 메서드를 수정하여 인증된 사용자의 id에 따라 레코드를 가져오도록 수정

```javascript
async fetchGames(userId) {
  const { data, error } = await supabase
    .from('baseball02')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching games:', error);
  } else {
    this.games = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}
```
  - 느낀 점 : 사용자별로 다른 데이터를 보여주어야 하는 프로그램을 개발할 때, 습관적으로 별도 로그인 환경을 함께 확인해야겠다고 반성하게 되었음.

<br>


## 개선 목표 🪴


- 어드민 페이지를 통해 내가 작성한 글 목록을 한 번에 관리할 수 있는 기능 추가
- 별도 페이지에 마이 팀의 해당 시즌 등번호, 캐치프레이즈 등 사용자에게 다양한 볼거리 제공


