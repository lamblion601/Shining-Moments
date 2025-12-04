import "react-native-url-polyfill/auto"; // 필수!
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config/env";

// 환경 변수에서 Supabase 설정 가져오기
console.log("🔧 Supabase 초기화 중...", {
  url: SUPABASE_URL ? `${SUPABASE_URL.substring(0, 20)}...` : "❌ 설정되지 않음",
  hasKey: !!SUPABASE_ANON_KEY,
});

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

console.log("✅ Supabase 클라이언트 생성 완료");



