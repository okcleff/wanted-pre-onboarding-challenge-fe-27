# wanted-pre-onboarding-challenge-fe-27

## 프로젝트 소개

원티드 프리온보딩 프론트엔드 챌린지 사전과제로 처음 제작하고, 강의 내용을 반영하여 리팩토링을 거듭한 **Todo List 애플리케이션**입니다.

## 프로젝트 실행

### > 라이브 배포 서버([https://wanted-pre-onboarding-challenge-fe-27-one.vercel.app/](https://wanted-pre-onboarding-challenge-fe-27-one.vercel.app/))

### > 로컬 설치 및 실행 방법

1. 레포지토리를 클론합니다:

   ```bash
   git clone https://github.com/okcleff/wanted-pre-onboarding-challenge-fe-27.git
   ```

2. 프로젝트 디렉토리로 이동 후 필요한 패키지를 설치합니다:

   ```bash
   cd wanted-pre-onboarding-challenge-fe-27
   yarn
   ```

3. 개발 서버를 실행합니다:

   ```bash
   yarn dev
   ```

4. 로컬 브라우저에서 [http://localhost:5173/auth/signup](http://localhost:5173/auth/signup)으로 접속해서 앱을 확인할 수 있습니다. (회원가입 및 로그인 필수)

### > API 서버 연결

- 사전 과제에서 제공된 [TodoList API 서버](https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api/tree/refactor)의 **refactor** 브랜치를 설치하고, 로컬 환경([http://localhost:8080](http://localhost:8080))에서 실행 중인지 확인해주세요.

## 사용한 기술

- react, react-router-dom, tanstack/react-query, tailwindcss, react-error-boundary 등

## 개발 과정 중 고려 사항

- **코드 일관성**: 변수명, 함수명, 코드 스타일의 일관성을 최대한 유지하며 작성
- **컴포넌트 설계**: 재사용 가능한 컴포넌트 분리 및 파일 구조 관리
- **에러 처리**: 네트워크 요청 에러나 비동기 작업의 예외 상황을 고려한 에러 핸들링, 에러 바운더리 적용
