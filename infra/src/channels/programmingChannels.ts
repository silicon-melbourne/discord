import * as discord from "../discord/resources";

const category = new discord.GuildChannel("programming-languages", {
  name: "Programming Languages",
  type: discord.ChannelType.GuildCategory,
});

const rust = new discord.GuildChannel("rust", {
  name: "rust",
  type: discord.ChannelType.GuildText,
});

export { rust };
