# 데이터베이스 스키마 설계 문서

## 개요
ShiningMoments 프로젝트는 교회, 어린이집, 유치원 등의 연락처 정보를 관리하는 시스템입니다.

## 데이터베이스 구조

### 1. 지역(Region) 테이블
지역 정보를 관리하는 마스터 테이블입니다.

```sql
CREATE TABLE regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,  -- 지역명 (예: 서울특별시, 경기도)
    code VARCHAR(20) UNIQUE,     -- 지역 코드
    parent_id UUID REFERENCES regions(id),  -- 상위 지역 (시/도 > 시/군/구)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. 교회(Church) 테이블
교회 정보를 저장하는 테이블입니다.

```sql
CREATE TABLE churches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,           -- 교회명
    denomination VARCHAR(100),             -- 교단
    address TEXT,                          -- 주소
    region_id UUID REFERENCES regions(id), -- 지역 ID
    phone VARCHAR(50),                     -- 전화번호
    website VARCHAR(255),                  -- 웹사이트
    pastor_name VARCHAR(100),              -- 담임목사명
    established_date DATE,                 -- 설립일
    member_count INTEGER,                  -- 교인 수
    latitude DECIMAL(10, 8),               -- 위도
    longitude DECIMAL(11, 8),              -- 경도
    notes TEXT,                            -- 비고
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_churches_region ON churches(region_id);
CREATE INDEX idx_churches_name ON churches(name);
```

### 3. 어린이집(Kindergarten) 테이블
어린이집 정보를 저장하는 테이블입니다.

```sql
CREATE TABLE kindergartens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,           -- 어린이집명
    registration_number VARCHAR(50),      -- 등록번호
    type VARCHAR(50),                     -- 유형 (국공립, 민간, 가정 등)
    address TEXT,                          -- 주소
    region_id UUID REFERENCES regions(id), -- 지역 ID
    phone VARCHAR(50),                     -- 전화번호
    director_name VARCHAR(100),           -- 원장명
    capacity INTEGER,                      -- 정원
    current_enrollment INTEGER,            -- 현재 재원아 수
    established_date DATE,                 -- 설립일
    latitude DECIMAL(10, 8),              -- 위도
    longitude DECIMAL(11, 8),             -- 경도
    notes TEXT,                            -- 비고
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_kindergartens_region ON kindergartens(region_id);
CREATE INDEX idx_kindergartens_name ON kindergartens(name);
CREATE INDEX idx_kindergartens_type ON kindergartens(type);
```

### 4. 유치원(Nursery) 테이블
유치원 정보를 저장하는 테이블입니다.

```sql
CREATE TABLE nurseries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,           -- 유치원명
    registration_number VARCHAR(50),      -- 등록번호
    type VARCHAR(50),                     -- 유형 (국공립, 사립 등)
    address TEXT,                          -- 주소
    region_id UUID REFERENCES regions(id), -- 지역 ID
    phone VARCHAR(50),                     -- 전화번호
    director_name VARCHAR(100),           -- 원장명
    capacity INTEGER,                      -- 정원
    current_enrollment INTEGER,            -- 현재 재원아 수
    established_date DATE,                 -- 설립일
    latitude DECIMAL(10, 8),              -- 위도
    longitude DECIMAL(11, 8),             -- 경도
    notes TEXT,                            -- 비고
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_nurseries_region ON nurseries(region_id);
CREATE INDEX idx_nurseries_name ON nurseries(name);
CREATE INDEX idx_nurseries_type ON nurseries(type);
```

### 5. 연락처(Contact) 테이블
추가 연락처 정보를 저장하는 테이블입니다. (선택사항)

```sql
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(20) NOT NULL,     -- 'church', 'kindergarten', 'nursery'
    entity_id UUID NOT NULL,              -- 해당 엔티티의 ID
    contact_type VARCHAR(50),             -- 연락처 유형 (전화, 이메일, 팩스 등)
    value VARCHAR(255) NOT NULL,          -- 연락처 값
    is_primary BOOLEAN DEFAULT FALSE,      -- 주요 연락처 여부
    notes TEXT,                            -- 비고
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contacts_entity ON contacts(entity_type, entity_id);
```

## 관계도 (ERD)

```
regions (지역)
  ├── churches (교회)
  ├── kindergartens (어린이집)
  └── nurseries (유치원)

churches, kindergartens, nurseries
  └── contacts (연락처) [선택사항]
```

## 주요 기능

### 1. 지역별 검색
- 지역(시/도, 시/군/구)별로 교회, 어린이집, 유치원 검색

### 2. 통합 검색
- 이름, 주소, 전화번호 등으로 통합 검색

### 3. 지도 표시
- 위도/경도 정보를 활용한 지도 표시

### 4. 데이터 관리
- Excel 파일에서 데이터 임포트
- 데이터 업데이트 및 삭제

## 보안 및 권한 (RLS - Row Level Security)

Supabase를 사용하는 경우, Row Level Security를 설정하여 데이터 접근을 제어할 수 있습니다.

```sql
-- 예시: 모든 사용자가 읽기만 가능하도록 설정
ALTER TABLE churches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON churches FOR SELECT USING (true);

ALTER TABLE kindergartens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON kindergartens FOR SELECT USING (true);

ALTER TABLE nurseries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON nurseries FOR SELECT USING (true);
```

## 데이터 마이그레이션 전략

1. Excel 파일에서 데이터 추출
2. 지역 정보 정규화
3. 각 테이블에 데이터 삽입
4. 중복 데이터 처리

## 향후 확장 가능성

- 리뷰/평점 시스템
- 즐겨찾기 기능
- 통계 및 분석 기능
- API 제공



