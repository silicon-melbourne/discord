import { httpRequest } from "./httpRequest.ts";

type NewsQuery = {
  size?: number;
  category?: string;
  country?: string;
};

type QueryOpts =
  | { q: string; qInMeta?: never; qInTitle?: never }
  | { q?: never; qInMeta: string; qInTitle?: never }
  | { q?: never; qInMeta?: never; qInTitle: string };

const API_TOKEN = process.env.NEWSDATAIO_API_KEY ?? "";
const NEWS_API_URL = "https://newsdata.io/api/1/latest";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source_name: string;
}

export async function getNews(q: QueryOpts & NewsQuery) {
  if (q.q == null && q.qInTitle == null && q.qInMeta == null) {
    throw new Error("No query defined");
  }

  const news = await httpRequest<{ results: NewsItem[] }>(NEWS_API_URL, {
    params: {
      ...q,
      apikey: API_TOKEN,
      language: "en",
      size: `${q.size ?? 10}`,
    },
    parseJson: true,
  });

  return news.results;
}
