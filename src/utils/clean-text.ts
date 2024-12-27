export default function cleanText(text: string) {
  // HTML 엔티티 디코딩
  const doc = new DOMParser().parseFromString(text, "text/html");
  const decodedText = doc.documentElement.textContent;

  // 깨진 문자 제거
  return decodedText?.replace(/�/g, "");
}
