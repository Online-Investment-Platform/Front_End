import { News } from "@/app/main/types/index";

async function getNews(): Promise<News[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/news`);
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
}

export default getNews;
