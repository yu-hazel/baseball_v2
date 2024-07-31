# ⚾️ 내 꿈은 승리요정 ver.2

### 이겨도, 져도 화가 나는 야구 찐팬들을 위한 야구 기록 웹 앱

이 프로젝트는 'Vue.js를 활용한 프로그레시브 웹 앱(PWA) 개발자 양성과정[14th]' 수강을 바탕으로 제작한 개인 포트폴리오 프로젝트입니다. <br>
초기 버전(ver.1)은 모든 항목을 수기로 입력하고 로컬 스토리지에 저장하는 로직으로 이루어졌습니다. <br>
해당 디벨롭 버전(ver.2)에서는 **Supabase**를 통한 데이터 관리로 반영구적인 데이터 관리를 구현하고, 사용자의 입력 피로도를 감소하는 데 주 목적을 두어 개발하였습니다.

**Vite**를 사용하여 빌드 과정을 간소화하였으며, **Vuetify**를 활용하여 UI 커스텀 비용을 최소화했습니다. <br>
최종 배포는 **PWA**를 통해 웹 앱을 데스크탑 및 모바일 기기에서 다운로드하여 사용할 수 있도록 하였습니다.


<br>


## ✋🏻 개요 

- 프로젝트 이름 : 내 꿈은 승리요정
- 진행 기간 : 2024.07.09 ~ 2024.07.19
- 기여도 : 100% (개인 프로젝트)
- 배포 주소 : https://yu-hazel.github.io/baseball_v2/
- [UI정의서](https://drive.google.com/file/d/1EFrpVXLYfYtL2qvvhen-D7c_k7I0MUHK/view?usp=drive_link)

<br>

## 🥞 기술 스택 

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


## 📋 미리 보기 

![승리요정](https://github.com/user-attachments/assets/0b11976f-3899-46a4-8d89-6fe32a771ee9) |![승리요정02](https://github.com/user-attachments/assets/10e8306a-7f84-487a-8270-0cec5c1e0e53)
--- | --- |

<br>


## 🐳 주요 기능 

- **Supabase를 통한 로그인, 데이터 CRUD**
  - 사용자 인증 및 로그인 : GitHub OAuth를 사용하여 사용자가 간편하게 로그인할 수 있는 기능을 구현하였습니다. 또한, 로그인한 사용자별로 경기 기록 데이터를 관리할 수 있습니다.
  - Supabase를 통해 반영구적인 데이터 관리로 사용자의 데이터가 지속적으로 유지됩니다.
    

- **Python, BeautifulSoup으로 크롤링한 KBO 경기 일정을 바탕으로 기록 등록**
  - Python의 BeautifulSoup 라이브러리를 사용하여 KBO 경기 일정을 크롤링한 데이터를 사용합니다.
  - 크롤링된 데이터를 별도의 Supabase 테이블에 저장해 두어, 사용자가 날짜를 선택하면 해당 날짜의 경기 일정이 자동으로 표시되어 기록 등록이 간편합니다.
    

- **마이 팀 설정에 따른 배경 이미지(팀 로고) 연동**
  - 사용자가 선택한 마이 팀은 Supabase 테이블에 저장됩니다.
  - 설정된 마이 팀에 따라 배경 이미지가 해당 팀의 로고로 변경됩니다. 단순한 마이 팀 설정에서 그치지 않고, 이를 일종의 테마와 연결지어 구현하였습니다.
  - 변경하는 마이 팀마다 배경 이미지가 바뀌므로 사용자에게 즉각적인 피드백을 제공하고, 개인화된 UX를 제공합니다.

<br>

## 🪴 개선 예정

- 어드민 페이지를 통해 내가 작성한 글 목록을 한 번에 관리할 수 있는 기능 추가
- 별도 페이지에 마이 팀의 해당 시즌 등번호, 캐치프레이즈 등 사용자에게 다양한 볼거리 제공


