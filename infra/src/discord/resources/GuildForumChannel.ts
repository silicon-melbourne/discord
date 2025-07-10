import * as pulumi from "@pulumi/pulumi";
import { ResourceProvider } from "../ResourceProvider";
import { DynamicResource } from "../DynamicResource";
import {
  APIGuildForumChannel,
  ChannelType,
  Snowflake,
} from "discord-api-types/v10";
import { CreateForumChannelParams } from "./ChannelCreateTypes";

type Inputs = CreateForumChannelParams & { parent_id: Snowflake };
type Outputs = APIGuildForumChannel;

class GuildForumChannelProvider extends ResourceProvider<Inputs, Outputs> {
  compareKeys = [
    "name",
    "topic",
    "permission_overwrites",
    "rate_limit_per_user",
    "default_auto_archive_duration",
    "position",
  ];

  stableKeys = ["id"];

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult<Outputs>> {
    const channel = (await this.client.guild.createGuildChannel(this.serverId, {
      ...(inputs as APIGuildForumChannel),
      type: ChannelType.GuildForum,
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
    await this.client.channel.updateChannel(olds.id, news);

    const channel = (await this.client.channel.getChannel(olds.id)) as Outputs;

    return { outs: channel };
  }
}

export class GuildForumChannel extends DynamicResource {
  public readonly name!: pulumi.Output<string>;

  constructor(
    name: string,
    args: Inputs,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super(
      new GuildForumChannelProvider(name),
      `GuildForumChannel:${name}`,
      args,
      opts
    );
  }
}

