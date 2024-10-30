/*eslint-disable */

"use server";

import { cookies } from "next/headers";

/**
 * 쿠키 설정을 위한 옵션 인터페이스
 * @interface
 */
interface CookieOptions {
  /**
   * 쿠키의 만료 일시를 설정
   * Date 객체나 타임스탬프(밀리초) 사용
   * @example
   * expires: new Date('2024-12-31')
   * expires: Date.now() + 24 * 60 * 60 * 1000  // 24시간 후
   */
  expires?: Date | number;

  /**
   * 쿠키가 유효한 상대적 시간(초)
   * @example
   * maxAge: 60 * 60  // 1시간
   * maxAge: 24 * 60 * 60  // 1일
   * maxAge: 30 * 24 * 60 * 60  // 30일
   */
  maxAge?: number;

  /**
   * 쿠키가 유효한 경로
   * @default "/"
   * @example
   * path: "/"  // 모든 경로에서 접근 가능
   * path: "/admin"  // /admin 경로에서만 접근 가능
   * path: "/shop/cart"  // /shop/cart 경로에서만 접근 가능
   */
  path?: string;

  /**
   * 쿠키가 유효한 도메인
   * @example
   * domain: "example.com"  // example.com과 그 서브도메인에서 접근 가능
   * domain: "api.example.com"  // api.example.com에서만 접근 가능
   */
  domain?: string;

  /**
   * HTTPS 전송 여부
   * - true: HTTPS 연결에서만 쿠키 전송
   * - false: HTTP에서도 쿠키 전송
   * @default true in production
   * @example
   * secure: true  // HTTPS에서만 쿠키 전송 (프로덕션 환경 권장)
   * secure: false  // HTTP에서도 쿠키 전송 (개발 환경)
   */
  secure?: boolean;

  /**
   * JavaScript에서의 쿠키 접근 제한
   * - true: document.cookie로 접근 불가 (보안 강화)
   * - false: document.cookie로 접근 가능
   * @default true
   * @example
   * httpOnly: true  // JavaScript에서 접근 불가
   * httpOnly: false  // JavaScript에서 접근 가능
   */
  httpOnly?: boolean;

  /**
   * 크로스 사이트 요청에 대한 쿠키 전송 정책
   * - "strict": 같은 사이트 요청에만 쿠키 전송
   * - "lax": 일부 크로스 사이트 요청에 쿠키 전송 허용 (기본값)
   * - "none": 모든 크로스 사이트 요청에 쿠키 전송 (secure: true 필요)
   * @default "lax"
   * @example
   * sameSite: "strict"  // 가장 엄격한 보안
   * sameSite: "lax"     // 적절한 보안과 사용성 균형
   * sameSite: "none"    // 크로스 사이트 요청 허용
   */
  sameSite?: "lax" | "strict" | "none";
}

/**
 * Next.js 쿠키 유틸리티 함수들
 * 서버 컴포넌트와 클라이언트 컴포넌트 모두에서 사용 가능
 */

/**
 * 쿠키 설정 함수
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param options 쿠키 옵션
 * @example
 * setCookie("token", "jwt-token");
 * setCookie("theme", "dark", { maxAge: 3600, httpOnly: true });
 */
export async function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): Promise<void> {
  const defaultOptions: CookieOptions = {
    path: "/",
    maxAge: 24 * 60 * 60, // 1일
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  const cookieOptions = { ...defaultOptions, ...options };
  cookies().set(name, value, cookieOptions);
}

/**
 * 쿠키 가져오기 함수
 * @param name 쿠키 이름
 * @returns 쿠키 값 또는 undefined
 * @example
 * const token = await getCookie("token");
 */
export async function getCookie(name: string): Promise<string | undefined> {
  try {
    return cookies().get(name)?.value;
  } catch (error) {
    console.error(`Error getting cookie ${name}:`, error);
    return undefined;
  }
}

/**
 * 쿠키 삭제 함수
 * @param name 쿠키 이름
 * @param options 쿠키 옵션 (path, domain 등)
 * @example
 * deleteCookie("token");
 * deleteCookie("theme", { path: "/dashboard" });
 */
export async function deleteCookie(
  name: string,
  options: Pick<CookieOptions, "path" | "domain"> = {},
): Promise<void> {
  try {
    cookies().delete({ name, ...options });
  } catch (error) {
    console.error(`Error deleting cookie ${name}:`, error);
  }
}

/**
 * 모든 쿠키 가져오기
 * @returns 모든 쿠키 객체
 * @example
 * const allCookies = await getAllCookies();
 */
export async function getAllCookies(): Promise<Record<string, string>> {
  const cookieStore = cookies();
  return Object.fromEntries(
    cookieStore.getAll().map((cookie) => [cookie.name, cookie.value]),
  );
}

/**
 * 쿠키 존재 여부 확인
 * @param name 쿠키 이름
 * @returns 존재 여부
 * @example
 * if (await hasCookie("token")) {
 *   // 로직 처리
 * }
 */
export async function hasCookie(name: string): Promise<boolean> {
  return cookies().has(name);
}
