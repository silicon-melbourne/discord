import { ChannelType } from "discord-api-types/v10";
import { SnowTransfer } from "snowtransfer";

const client = new SnowTransfer(process.env.DISCORD_TOKEN);

async function main() {
  const guild = await client.guild.getGuild("1377448057179865169");
  console.log(guild);

  const channel = await client.channel.getChannel("1378628671060836392");
  console.log(channel);

  const php = await client.guild.createGuildChannel(guild.id, {
    name: "php",
    type: ChannelType.GuildCategory,
  });

  if (php.type === ChannelType.GuildCategory) {
    php
  }

  console.log(php);
}

main();
