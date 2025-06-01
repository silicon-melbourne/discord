import * as discord from "./discord/resources";
import "./channels";

const guild = new discord.Guild("silicon.melbourne", {
  name: "Silicon Melbourne",
});

export const outputs = {
  guild: guild.id,
};
