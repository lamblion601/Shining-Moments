import axios from 'axios';
import { N8N_WEBHOOK_URL } from '../config/env';

// n8n Webhook URL (환경변수에서 가져오기)
console.log("🔧 API 서비스 초기화 중...", {
  webhookUrl: N8N_WEBHOOK_URL ? `${N8N_WEBHOOK_URL.substring(0, 30)}...` : "❌ 설정되지 않음",
});

export interface UploadImageRequest {
  imageUri: string;
  description: string;
  userId: string;
  childId?: string;
}

export interface AnalysisResponse {
  success: boolean;
  reportId?: string;
  analysis?: any;
  error?: string;
}

/**
 * 그림 분석을 위한 n8n Webhook 호출
 */
export const analyzeImage = async (
  data: UploadImageRequest
): Promise<AnalysisResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: data.imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    } as any);
    formData.append('description', data.description);
    formData.append('userId', data.userId);
    if (data.childId) {
      formData.append('childId', data.childId);
    }

    const response = await axios.post(N8N_WEBHOOK_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30000, // 30초 타임아웃
    });

    return {
      success: true,
      reportId: response.data.reportId,
      analysis: response.data.analysis,
    };
  } catch (error: any) {
    console.error('이미지 분석 실패:', error);
    return {
      success: false,
      error: error.message || '이미지 분석 중 오류가 발생했습니다.',
    };
  }
};




