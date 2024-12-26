export default async function makeApiRequest<T, R = string>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  options: {
    token?: string | null; // token을 옵셔널로 변경
    data?: T;
    responseType?: "json" | "text";
  },
): Promise<R> {
  const { token, data, responseType = "json" } = options;

  const headers: HeadersInit = {
    // 기본 headers 객체 생성
    ...(data && { "Content-Type": "application/json" }),
    // token이 있을 때만 Authorization 헤더 추가
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config: RequestInit = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    config,
  );

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(
      errorData || `요청 실패: ${response.status} ${response.statusText}`,
    );
  }

  return responseType === "json" ? response.json() : response.text();
}
