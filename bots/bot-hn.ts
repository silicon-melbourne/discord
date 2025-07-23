import { sendToDiscord } from "./utils/sendToDiscord.ts";
import { httpRequest } from "./utils/httpRequest.ts";

const fileSourceCodeUrl =
  "https://github.com/silicon-melbourne/discord/blob/main/bots/bot-hn.ts";

interface HackerNewsStory {
  id: number;
  title?: string;
  url?: string;
  score?: number;
  descendants?: number;
  by?: string;
}

async function getTopStories(count: number = 3): Promise<HackerNewsStory[]> {
  try {
    console.log("Fetching top stories from Hacker News...");
    const topStoryIds = await httpRequest<number[]>(
      "https://hacker-news.firebaseio.com/v0/topstories.json"
    );

    const topIds = topStoryIds.slice(0, count);
    const stories: HackerNewsStory[] = [];

    for (const id of topIds) {
      console.log(`Fetching story ${id}...`);
      const story = await httpRequest<HackerNewsStory>(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      stories.push(story);
    }

    return stories;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
}

function formatStoryForDiscord(story: HackerNewsStory): string {
  const title = story.title ?? "No title";
  const url = story.url ?? `https://news.ycombinator.com/item?id=${story.id}`;
  const score = story.score ?? 0;
  const comments = story.descendants ?? 0;
  const author = story.by ?? "Unknown";

  return `**[${title}](<${url}>)**
-# [${author}](<https://news.ycombinator.com/user?id=${author}>) | ${score} points | [${comments} comments](<https://news.ycombinator.com/item?id=${story.id}>)`;
}

async function main(): Promise<void> {
  try {
    const stories = await getTopStories(3);

    const message = stories.reduce((msg, story) => {
      return msg + formatStoryForDiscord(story) + "\n";
    }, "-# **Top Hacker News Stories**\n");

    console.log("Sending to Discord...");
    await sendToDiscord(
      message + `-# (Source code for this bot is [here](${fileSourceCodeUrl}))`
    );
    console.log("Successfully sent to Discord!");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
