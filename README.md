# React Todo App

Vite + React + Tailwind CSS v4로 구현한 날짜별 Todo 관리 앱입니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 구현 기능

### Todo 관리
- 할 일 추가 (Enter 키 또는 추가 버튼)
- 빈 입력값 제출 시 안내 메시지 표시
- 인라인 수정 (수정 버튼 클릭 → 텍스트 직접 편집, Enter 저장 / Esc 취소)
- 완료 처리 / 되돌리기 (체크박스 + 취소선 표시)
- 삭제

### 필터
- 전체 / 진행 중 / 완료 탭으로 필터링
- 각 탭에 해당 건수 뱃지 표시
- 탭 전환 후 Todo 추가 시에도 필터 유지

### 날짜 & 주간 뷰
- 이번 주 월~일 날짜 표시
- 날짜별 Todo 개수 표시
- 이전 / 다음 주 이동 버튼
- 월 레이블 클릭 시 달력 팝업 → 원하는 날짜로 바로 이동
- 오늘 날짜 강조 표시
- Todo 추가 시 선택된 날짜로 자동 저장

### 데이터 유지
- `localStorage`에 JSON으로 저장
- `useEffect`로 todos 변경 시 자동 저장
- 새로고침 후에도 데이터 및 주간 뷰 상태 유지

## 프로젝트 구조

```
src/
├── App.jsx                  # 전역 상태 관리
└── components/
    ├── WeeklyView.jsx       # 주간 날짜 뷰 + 주 이동
    ├── CalendarPicker.jsx   # 달력 팝업
    ├── FilterTabs.jsx       # 전체/진행 중/완료 필터
    ├── TodoInput.jsx        # 입력창 + 유효성 검사
    ├── TodoList.jsx         # Todo 목록 렌더링
    └── TodoItem.jsx         # 개별 Todo (수정/완료/삭제)
```
