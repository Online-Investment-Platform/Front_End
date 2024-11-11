/**
 * 테이블 컬럼 인터페이스
 * @template T - 테이블 데이터 타입
 */
export interface CommonTableColumn<T> {
  /** 데이터의 키값 */
  key: keyof T;
  /** 컬럼 헤더에 표시될 텍스트 */
  header: string;
  /** 컬럼의 너비 (예: '100px', '50%') */
  width?: string;
  /** 텍스트 정렬 방향 */
  align?: "left" | "center" | "right";
  /**
   * 셀 데이터를 커스텀하게 렌더링하는 함수
   * @param value - 현재 셀의 값
   * @param row - 현재 행의 전체 데이터
   * @returns React 노드
   */
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

/**
 * 테이블 컴포넌트 Props 인터페이스
 * @template T - 테이블 데이터 타입
 */
export interface CommonTableProps<T> {
  /** 테이블 컬럼 설정 배열 */
  columns: CommonTableColumn<T>[];
  /** 테이블에 표시될 데이터 배열 */
  data: T[];
  /** 각 행을 구분하는 고유 키 필드명 */
  rowKeyField: keyof T;
  /** 테이블에 적용할 CSS 클래스 */
  className?: string;
  /** 행 클릭 이벤트 핸들러 */
  onRowClick?: (row: T) => void;
}
