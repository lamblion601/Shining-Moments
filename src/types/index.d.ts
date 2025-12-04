/**
 * TypeScript 타입 정의
 */

// 사용자 타입
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'institution';
  createdAt: string;
  updatedAt: string;
}

// 아이 정보 타입
export interface Child {
  id: string;
  userId: string;
  name: string;
  birthDate?: string;
  createdAt: string;
  updatedAt: string;
}

// 그림 업로드 타입
export interface Drawing {
  id: string;
  childId?: string;
  userId: string;
  imageUri: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// 분석 리포트 타입
export interface AnalysisReport {
  id: string;
  drawingId: string;
  analysis: {
    emotionalState?: string;
    developmentalStage?: string;
    insights?: string[];
    recommendations?: string[];
  };
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}

// 코칭 가이드 타입
export interface CoachingGuide {
  id: string;
  reportId: string;
  conversationGuide?: string[];
  prayerGuide?: string;
  tips?: string[];
  createdAt: string;
}

// 대시보드 통계 타입
export interface DashboardStats {
  totalDrawings: number;
  totalReports: number;
  recentDrawings: Drawing[];
  emotionalTrends?: {
    date: string;
    emotion: string;
  }[];
}




