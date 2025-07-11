import { getNews } from "./utils/news.ts";
import { sendToDiscord } from "./utils/sendToDiscord.ts";

async function main() {
  const news = await getNews({
    q: '("software engineers" OR developers OR openai) AND ("artificial intelligence" OR AI)',
    category: "technology",
    country: "au,us",
    size: 3,
  });

  const message = news.reduce((msg, item) => {
    return (
      msg + `**[${item.title}](<${item.link}>)**\n-# ${item.source_name}\n`
    );
  }, "### AI& LLM Headlines\n\n");

  sendToDiscord(message);
}

main();
