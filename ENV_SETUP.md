# 환경 변수 설정 가이드

이 프로젝트는 API 키와 같은 민감한 정보를 환경 변수로 관리합니다. 
코드에 직접 API 키를 넣지 않고, 컴퓨터의 환경 변수로 설정하는 방법을 안내합니다.

## 📋 목차
1. [환경 변수란?](#환경-변수란)
2. [설정 방법](#설정-방법)
3. [필수 환경 변수 목록](#필수-환경-변수-목록)
4. [주의사항](#주의사항)

---

## 환경 변수란?

환경 변수는 프로그램이 실행될 때 사용하는 설정 값입니다. 
API 키나 비밀번호 같은 민감한 정보를 코드에 직접 넣지 않고, 
별도의 파일에 저장해서 관리할 수 있습니다.

**장점:**
- ✅ 코드에 비밀 정보가 노출되지 않음
- ✅ Git에 올려도 안전함 (`.env` 파일은 `.gitignore`에 포함됨)
- ✅ 개발/운영 환경별로 다른 값 사용 가능
- ✅ 팀원들과 코드 공유 시 API 키를 따로 전달 가능

---

## 설정 방법

### 1단계: `.env` 파일 생성

프로젝트 루트 폴더(`package.json`이 있는 폴더)에 `.env` 파일을 만듭니다.

**Windows에서 만드는 방법:**
1. 프로젝트 폴더를 열기
2. 빈 공간에서 우클릭 → 새로 만들기 → 텍스트 문서
3. 파일 이름을 `.env`로 변경 (확장자 없음)
   - 파일 이름 변경 시 `.txt` 확장자를 제거해야 합니다
   - Windows 탐색기에서 "파일 이름 확장자" 표시 옵션을 켜야 할 수 있습니다

**또는 명령어로 만들기:**
```powershell
# PowerShell에서 실행
New-Item -Path .env -ItemType File
```

### 2단계: 환경 변수 값 입력

`.env` 파일을 열고 아래 형식으로 환경 변수를 입력합니다:

```env
# Supabase 설정
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# n8n Webhook URL
EXPO_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-webhook-url.com

# Google Generative AI API Key (필요한 경우)
EXPO_PUBLIC_GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

**⚠️ 중요:**
- `=` 앞뒤로 공백 없이 작성하세요
- 값에 공백이 있으면 따옴표로 감싸세요: `EXPO_PUBLIC_N8N_WEBHOOK_URL="https://example.com/webhook"`
- 주석은 `#`로 시작합니다

### 3단계: 패키지 설치

터미널에서 다음 명령어를 실행하여 필요한 패키지를 설치합니다:

```bash
pnpm install
```

### 4단계: 앱 재시작

환경 변수를 변경한 후에는 반드시 앱을 재시작해야 합니다:

```bash
# 개발 서버 중지 (Ctrl + C)
# 그 다음 다시 시작
pnpm run dev
```

---

## 필수 환경 변수 목록

| 변수명 | 설명 | 필수 여부 |
|--------|------|----------|
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | ✅ 필수 |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | ✅ 필수 |
| `EXPO_PUBLIC_N8N_WEBHOOK_URL` | n8n Webhook URL | ✅ 필수 |
| `EXPO_PUBLIC_GOOGLE_AI_API_KEY` | Google AI API Key | ⚠️ 선택 |

---

## 주의사항

### 🔒 보안

1. **`.env` 파일은 절대 Git에 올리지 마세요!**
   - 이미 `.gitignore`에 추가되어 있어서 자동으로 제외됩니다
   - 만약 실수로 올렸다면 즉시 삭제하고 API 키를 재발급 받으세요

2. **`.env` 파일을 다른 사람과 공유하지 마세요**
   - 팀원에게는 `.env.example` 파일을 공유하고, 각자 자신의 API 키를 입력하도록 하세요

3. **API 키가 노출되었다면 즉시 재발급**
   - GitHub에 올라갔다면 즉시 삭제하고 새 키를 발급받으세요

### 📝 네이밍 규칙

- Expo에서는 환경 변수 이름 앞에 `EXPO_PUBLIC_` 접두사를 붙여야 합니다
- 이 접두사가 없으면 환경 변수가 제대로 작동하지 않을 수 있습니다

### 🔄 환경 변수 변경 후

환경 변수를 변경한 후에는:
1. 개발 서버를 중지 (Ctrl + C)
2. 캐시 삭제 (선택사항): `pnpm start --clear`
3. 개발 서버 재시작: `pnpm run dev`

---

## 문제 해결

### 환경 변수가 읽히지 않을 때

1. **파일 이름 확인**: `.env` 파일이 프로젝트 루트에 있는지 확인
2. **형식 확인**: `변수명=값` 형식이 맞는지 확인 (공백 없이)
3. **앱 재시작**: 환경 변수 변경 후 반드시 앱 재시작
4. **콘솔 로그 확인**: 앱 시작 시 환경 변수 검증 로그 확인

### 예시 로그

정상적으로 설정된 경우:
```
✅ 환경 변수가 정상적으로 설정되었습니다.
🔧 Supabase 초기화 중... { url: 'https://xxx.supabase...', hasKey: true }
✅ Supabase 클라이언트 생성 완료
```

설정되지 않은 경우:
```
⚠️ 필수 환경 변수가 설정되지 않았습니다: EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_ANON_KEY
📝 .env 파일을 확인하고 환경 변수를 설정해주세요.
```

---

## 추가 도움말

문제가 해결되지 않으면:
1. `.env.example` 파일을 참고하세요
2. `src/config/env.ts` 파일에서 환경 변수 사용 방법을 확인하세요
3. 팀원이나 개발자에게 문의하세요

