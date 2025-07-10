import * as discord from "./discord/resources";

import "./messages";

const guild = new discord.Guild("silicon.melbourne", {
  name: "Silicon Melbourne",
  description:
    "We are uniting the Melbourne technology scene. Join us as we build the largest Technology community in and around Melbourne and Victoria.",
});

export const outputs = {
  guild: guild.id,
};
