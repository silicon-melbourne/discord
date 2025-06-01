import * as pulumi from "@pulumi/pulumi";
import { ResourceProvider } from "../ResourceProvider";
import { DynamicResource } from "../DynamicResource";
import * as djs from "discord.js";

interface Inputs {
  name: string;
  type: djs.GuildChannelTypes;
}

interface Outputs extends Inputs {
  channelId: string;
}

class GuildChannelCategoryProvider extends ResourceProvider {
  async get(id: string) {
    const cache = this.guild!.channels.cache.get(id);
    if (cache != null) return cache;

    const channel = await this.guild!.channels.fetch(id);
    if (channel == null) throw new Error("Channel not found");

    return channel;
  }

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult<Outputs>> {
    const category = await this.guild!.channels.create({
      name: inputs.name,
      type: inputs.type,
    });

    return {
      id: channel.id,
      outs: { channelId: channel.id, name: channel.name, type: channel.type },
    };
  }

  async diff(
    _id: string,
    olds: Outputs,
    news: Outputs
  ): Promise<pulumi.dynamic.DiffResult> {
    let changes = false;

    if (olds.name !== news.name) changes = true;

    return {
      changes,
      replaces: [],
      stables: ["channelId"],
      deleteBeforeReplace: false,
    };
  }

  async update(
    _id: string,
    olds: Outputs,
    news: Outputs
  ): Promise<pulumi.dynamic.UpdateResult<Outputs>> {
    const outs = { ...olds };
    const channel = await this.get(olds.channelId);

    if (olds.name !== news.name) {
      await channel.setName(news.name);
      outs.name = channel.name;
    }

    return { outs };
  }
}

export class GuildChannelCategory extends DynamicResource {
  constructor(
    name: string,
    args: Inputs,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super(
      new GuildChannelCategoryProvider(name),
      `GuildChannelCategory:${name}`,
      args,
      opts
    );
  }
}
