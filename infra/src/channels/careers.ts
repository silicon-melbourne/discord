import * as discord from "../discord/resources";

const category = new discord.GuildChannel("careers", {
  name: "Careers",
  type: discord.ChannelType.GuildCategory,
});

const freelanceGigs = category.id.apply((parent_id) => {
  return new discord.GuildChannel("freelance-gigs", {
    name: "freelance-gigs",
    type: discord.ChannelType.GuildForum,
    parent_id,
    topic: "Post guidelines...",
    default_reaction_emoji: { emoji_name: "🙋" },
    available_tags: [
      { emoji_name: "💰", name: "paid", moderated: false },
      { emoji_name: "🎨", name: "design", moderated: false },
      { emoji_name: "🏗️", name: "engineering", moderated: false },
      { emoji_name: "🔎", name: "research", moderated: false },
      { emoji_name: "🤡", name: "unpaid", moderated: false },
    ],
  });
});

const findACofounder = category.id.apply((parent_id) => {
  return new discord.GuildChannel("find-a-cofounder", {
    name: "find-a-cofounder",
    type: discord.ChannelType.GuildForum,
    parent_id,
  });
});

export { category, freelanceGigs, findACofounder };
