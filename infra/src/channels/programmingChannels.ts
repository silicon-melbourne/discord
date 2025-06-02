import * as discord from "../discord/resources";

const category = new discord.GuildChannel("programming-languages", {
  name: "Programming Languages",
  type: discord.ChannelType.GuildCategory,
});

const rust = category.id.apply((parent_id) => {
  return new discord.GuildChannel("rust", {
    name: "rust",
    type: discord.ChannelType.GuildText,
    parent_id,
  });
});

const java = category.id.apply((parent_id) => {
  return new discord.GuildChannel("java", {
    name: "java",
    type: discord.ChannelType.GuildText,
    parent_id,
  });
});

const go = category.id.apply((parent_id) => {
  return new discord.GuildChannel("go", {
    name: "go",
    type: discord.ChannelType.GuildText,
    parent_id,
  });
});

const javascript = category.id.apply((parent_id) => {
  return new discord.GuildChannel("javascript", {
    name: "javascript",
    type: discord.ChannelType.GuildText,
    parent_id,
  });
});

export { category, rust, java, go, javascript };
