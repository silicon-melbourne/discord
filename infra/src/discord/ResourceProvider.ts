import * as pulumi from "@pulumi/pulumi";
import * as djs from "discord.js";

export abstract class ResourceProvider
  implements pulumi.dynamic.ResourceProvider
{
  name: string;
  token: string = "";
  serverId: string = "";

  client?: djs.Client;
  guild?: djs.Guild;

  constructor(name: string) {
    this.name = name;
  }

  async configure(req: pulumi.dynamic.ConfigureRequest) {
    this.token = req.config.get("discordToken") ?? "";
    this.serverId = req.config.get("serverId") ?? "";

    const client = new djs.Client({ intents: [djs.GatewayIntentBits.Guilds] });
    await client.login(this.token);

    this.client = client;

    const guild = this.client?.guilds.cache.get(this.serverId);

    if (guild == null) throw new Error("Unable to find Discord Guild");

    this.guild = guild;
  }

  abstract create(inputs: pulumi.Inputs): Promise<pulumi.dynamic.CreateResult>;
}
