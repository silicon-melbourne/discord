import * as pulumi from "@pulumi/pulumi";
import { ResourceProvider } from "../ResourceProvider";
import { DynamicResource } from "../DynamicResource";
import {
  APIChannel,
  APIGuildForumTag,
  RESTPostAPIGuildChannelJSONBody,
} from "discord-api-types/v10";

import * as utils from "util";
import { DistributiveMerge } from "../../../global";

type ForumTag = Omit<APIGuildForumTag, "id" | "emoji_id" | "moderated"> &
  Partial<Pick<APIGuildForumTag, "id" | "emoji_id" | "moderated">>;

type Inputs = DistributiveMerge<
  RESTPostAPIGuildChannelJSONBody,
  {
    available_tags?: ForumTag[];
    default_reaction_emoji?: { emoji_name?: string; emoji_id?: string };
  }
>;

type Outputs = APIChannel;

class GuildChannelProvider extends ResourceProvider {
  async create(inputs: Inputs): Promise<pulumi.dynamic.CreateResult<Outputs>> {
    const channel = await this.client?.guild.createGuildChannel(
      this.serverId,
      // @ts-expect-error
      inputs
    )!;

    return {
      id: channel.id,
      outs: channel,
    };
  }

  async check(olds: any, { __provider, ...news }: any) {
    return news;
  }

  async diff(
    _id: string,
    olds: any,
    news: any
  ): Promise<pulumi.dynamic.DiffResult> {
    const current: any = await this.client?.channel.getChannel(olds.id)!;
    const replaces = [];

    current?.available_tags?.forEach((tag: ForumTag) => {
      delete tag.id, delete tag.emoji_id;
    });

    const comp = { ...current, ...news };

    let changes = !utils.isDeepStrictEqual(current, comp);

    if (current.type !== comp.type) {
      changes = true;
      replaces.push("type");
    }

    return {
      changes,
      replaces,
      stables: [],
      deleteBeforeReplace: false,
    };
  }

  async update(
    _id: string,
    olds: Outputs,
    news: Inputs
  ): Promise<pulumi.dynamic.UpdateResult<Outputs>> {
    const channel = await this.client?.channel.updateChannel(olds.id, news);

    return { outs: channel };
  }

  async delete(id: string, props: any) {
    // TODO: Probably don't really want this
  }
}

export class GuildChannel extends DynamicResource {
  public readonly name!: pulumi.Output<string>;

  constructor(
    name: string,
    args: Inputs,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super(new GuildChannelProvider(name), `GuildChannel:${name}`, args, opts);
  }
}
