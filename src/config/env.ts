/**
 * 환경 변수 설정 파일
 * 
 * 이 파일은 .env 파일에서 환경 변수를 읽어와서 사용합니다.
 * 환경 변수는 EXPO_PUBLIC_ 접두사를 사용해야 합니다.
 */

// Supabase 설정
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// n8n Webhook URL
export const N8N_WEBHOOK_URL = process.env.EXPO_PUBLIC_N8N_WEBHOOK_URL || '';

// Google Generative AI API Key
export const GOOGLE_AI_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_AI_API_KEY || '';

/**
 * 환경 변수 검증 함수
 * 필수 환경 변수가 설정되지 않았을 때 경고를 표시합니다.
 */
export const validateEnv = () => {
  const required = [
    { key: 'EXPO_PUBLIC_SUPABASE_URL', value: SUPABASE_URL },
    { key: 'EXPO_PUBLIC_SUPABASE_ANON_KEY', value: SUPABASE_ANON_KEY },
  ];

  const missing = required.filter(({ value }) => !value);

  if (missing.length > 0) {
    console.warn('⚠️ 필수 환경 변수가 설정되지 않았습니다:', missing.map(({ key }) => key).join(', '));
    console.warn('📝 .env 파일을 확인하고 환경 변수를 설정해주세요.');
  } else {
    console.log('✅ 환경 변수가 정상적으로 설정되었습니다.');
  }
};

