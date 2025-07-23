import { getNews } from "./utils/news.ts";
import { sendToDiscord } from "./utils/sendToDiscord.ts";

const fileSourceCodeUrl =
  "https://github.com/silicon-melbourne/discord/blob/main/bots/bot-news-ai.ts";

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
  }, "-# **Top AI Headlines**\n");

  sendToDiscord(
    message + `-# (Source code for this bot is [here](<${fileSourceCodeUrl}>))`
  );
}

main();
