import * as pulumi from "@pulumi/pulumi";
import { ResourceProvider } from "../ResourceProvider";
import { DynamicResource } from "../DynamicResource";
import { APITextChannel, ChannelType } from "discord-api-types/v10";
import { CreateTextChannelParams } from "./ChannelCreateTypes";

type Inputs = CreateTextChannelParams;
type Outputs = APITextChannel;

class GuildTextChannelProvider extends ResourceProvider<Inputs, Outputs> {
  compareKeys: (keyof Inputs & keyof Outputs)[] = [
    "name",
    "topic",
    "permission_overwrites",
    "rate_limit_per_user",
    "default_auto_archive_duration",
    "position",
  ];

  stableKeys: (keyof Inputs | keyof Outputs)[] = ["id"];

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult<Outputs>> {
    const channel = (await this.client.guild.createGuildChannel(this.serverId, {
      ...inputs,
      type: ChannelType.GuildText,
    })) as Outputs;

    return {
      id: channel.id,
      outs: channel,
    };
  }

  async update(
    _id: string,
    olds: Outputs,
    news: Inputs
  ): Promise<pulumi.dynamic.UpdateResult<Outputs>> {
    const channel = (await this.client.channel.updateChannel(
      olds.id,
      news
    )) as Outputs;

    return { outs: channel };
  }
}

export class GuildTextChannel extends DynamicResource {
  public readonly name!: pulumi.Output<string>;

  constructor(
    name: string,
    args: Inputs,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super(
      new GuildTextChannelProvider(name),
      `GuildTextChannel:${name}`,
      args,
      opts
    );
  }
}
