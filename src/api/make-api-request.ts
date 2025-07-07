export default async function makeApiRequest<T, R = string>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  options: {
    data?: T;
    responseType?: "json" | "text";
  },
): Promise<R> {
  const { data, responseType = "json" } = options;
  const headers: HeadersInit = {
    ...(data && { "Content-Type": "application/json" }),
  };

  const config: RequestInit = {
    method,
    credentials: "include", // httpOnly 쿠키 자동 포함
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
