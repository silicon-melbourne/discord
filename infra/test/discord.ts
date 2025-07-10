import { ChannelType } from "discord-api-types/v10";
import { SnowTransfer } from "snowtransfer";

const client = new SnowTransfer(process.env.DISCORD_TOKEN);

async function main() {
  const guild = await client.guild.getGuild("1377448057179865169");
  console.log(guild);

  const channel = await client.channel.getChannel("1383995996047937598");
  console.log(channel);

  const message = await client.channel.getChannelMessage(
    channel.id,
    "1383995997998551071"
  );

  console.log(message);
}

main();
