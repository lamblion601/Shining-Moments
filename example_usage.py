"""
크롤링 데이터를 엑셀로 저장하는 간단한 사용 예제

실제 크롤링 코드와 함께 사용하는 방법:
"""

import pandas as pd
from save_to_excel import save_to_excel, save_to_excel_advanced

# 예제 1: 크롤링한 데이터를 리스트나 딕셔너리로 받은 경우
def example_1():
    """간단한 크롤링 결과를 엑셀로 저장"""
    
    # 크롤링 결과 (예: 웹사이트에서 가져온 제품 정보)
    crawled_data = {
        '제품명': ['노트북', '마우스', '키보드', '모니터'],
        '가격': [1200000, 35000, 89000, 450000],
        '평점': [4.5, 4.2, 4.8, 4.6],
        '재고': [10, 50, 30, 15]
    }
    
    # DataFrame으로 변환
    df = pd.DataFrame(crawled_data)
    
    # 엑셀에 저장
    save_to_excel(df, filename='제품정보.xlsx', sheet_name='제품목록')
    print("\n예제 1 완료!")


# 예제 2: 여러 데이터를 하나의 엑셀 파일에 여러 시트로 저장
def example_2():
    """여러 크롤링 결과를 하나의 엑셀 파일에 여러 시트로 저장"""
    
    # 첫 번째 크롤링 결과
    product_data = {
        '제품명': ['제품A', '제품B', '제품C'],
        '가격': [10000, 20000, 30000]
    }
    df1 = pd.DataFrame(product_data)
    
    # 두 번째 크롤링 결과
    review_data = {
        '리뷰ID': [1, 2, 3, 4],
        '평점': [5, 4, 5, 3],
        '댓글': ['좋아요', '보통', '최고', '별로']
    }
    df2 = pd.DataFrame(review_data)
    
    # ExcelWriter를 사용하여 여러 시트에 저장
    filename = '통합데이터.xlsx'
    with pd.ExcelWriter(filename, engine='openpyxl') as writer:
        df1.to_excel(writer, sheet_name='제품정보', index=False)
        df2.to_excel(writer, sheet_name='리뷰정보', index=False)
    
    print(f"\n예제 2 완료! '{filename}' 파일에 2개의 시트가 생성되었습니다.")


# 예제 3: 실제 크롤링 코드와 연동하는 방법
def example_3_crawling_integration():
    """
    실제 크롤링 코드와 연동하는 예제
    
    이 함수는 예시입니다. 실제로는 다음과 같이 사용합니다:
    
    # 크롤링 코드 (예: requests, BeautifulSoup, Selenium 등)
    import requests
    from bs4 import BeautifulSoup
    
    # 크롤링 수행
    response = requests.get('https://example.com')
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 데이터 추출
    titles = [tag.text for tag in soup.find_all('h2')]
    prices = [tag.text for tag in soup.find_all('span', class_='price')]
    
    # DataFrame 생성
    data = {'제목': titles, '가격': prices}
    df = pd.DataFrame(data)
    
    # 엑셀로 저장
    save_to_excel(df, filename='크롤링결과.xlsx')
    """
    
    # 실제 크롤링 코드 대신 샘플 데이터 사용
    print("\n[예제 3] 크롤링 통합 예제")
    print("실제로는 위의 주석처럼 크롤링 코드를 작성하시면 됩니다.")
    
    # 샘플 데이터
    sample_data = {
        '제목': ['크롤링된 항목 1', '크롤링된 항목 2'],
        '내용': ['내용 1', '내용 2']
    }
    df = pd.DataFrame(sample_data)
    
    save_to_excel(df, filename='크롤링결과.xlsx')
    print("예제 3 완료!")


if __name__ == "__main__":
    print("=" * 60)
    print("크롤링 데이터를 엑셀로 저장하는 사용 예제")
    print("=" * 60)
    
    # 예제 실행
    example_1()
    example_2()
    example_3_crawling_integration()
    
    print("\n" + "=" * 60)
    print("모든 예제 실행 완료!")
    print("=" * 60)





