import * as pulumi from "@pulumi/pulumi";
import { ResourceProvider } from "../ResourceProvider";
import { DynamicResource } from "../DynamicResource";
import { APIGuildCategoryChannel, ChannelType } from "discord-api-types/v10";
import { CreateCategoryChannelParams } from "./ChannelCreateTypes";

type Inputs = CreateCategoryChannelParams;
type Outputs = APIGuildCategoryChannel;

class GuildCategoryChannelProvider extends ResourceProvider<Inputs, Outputs> {
  compareKeys = ["name", "permission_overwrites", "position"];

  stableKeys = ["id"];

  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult<Outputs>> {
    const channel = (await this.client.guild.createGuildChannel(this.serverId, {
      ...inputs,
      type: ChannelType.GuildCategory,
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

export class GuildCategoryChannel extends DynamicResource {
  public readonly name!: pulumi.Output<string>;

  constructor(
    name: string,
    args: Inputs,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super(
      new GuildCategoryChannelProvider(name),
      `GuildCategoryChannel:${name}`,
      args,
      opts
    );
  }
}
