import * as pulumi from "@pulumi/pulumi";
import { ResourceProvider } from "../ResourceProvider";
import { DynamicResource } from "../DynamicResource";
import { APIGuild, RESTPatchAPIGuildJSONBody } from "discord-api-types/v10";

type Inputs = RESTPatchAPIGuildJSONBody;
type Outputs = APIGuild;

class GuildProvider extends ResourceProvider<Inputs, Outputs> {
  compareKeys: (keyof Inputs & keyof Outputs)[] = ["name", "icon"];
  stableKeys: (keyof Inputs | keyof Outputs)[] = ["id"];

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult<Outputs>> {
    const guild = await this.client?.guild.getGuild(this.serverId);

    if (guild == null) throw new Error("There is no guild with that ID");

    const guildToOwn = await this.client?.guild.updateGuild(guild.id, inputs)!;

    return {
      id: this.serverId,
      outs: guildToOwn,
    };
  }

  async update(
    _id: string,
    olds: Outputs,
    news: Outputs
  ): Promise<pulumi.dynamic.UpdateResult<Outputs>> {
    const outs = { ...olds };
    let update = false;

    for (const input in news) {
      if ((news as any)[input] !== (outs as any)[input]) update = true;
    }

    if (update) {
      const guild = await this.client?.guild.updateGuild(this.serverId, {
        ...olds,
        ...news,
      })!;

      return { outs: guild };
    }

    return { outs: olds };
  }
}

export class Guild extends DynamicResource {
  constructor(
    name: string,
    args: Inputs,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super(new GuildProvider(name), `Guild:${name}`, args, opts);
  }
}
