export default async function makeApiRequest<T, R = string>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  options: {
    token: string | null;
    data?: T;
    responseType?: "json" | "text";
  },
): Promise<R> {
  const { token, data, responseType = "json" } = options;

  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
    ...(data && { "Content-Type": "application/json" }),
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
