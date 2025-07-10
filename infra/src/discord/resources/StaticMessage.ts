import * as pulumi from "@pulumi/pulumi";
import { ResourceProvider } from "../ResourceProvider";
import { DynamicResource } from "../DynamicResource";
import {
  APIMessage,
  RESTPostAPIChannelMessageJSONBody,
} from "discord-api-types/v10";

type Inputs = RESTPostAPIChannelMessageJSONBody & {
  channel_id: pulumi.Input<string>;
};

type Outputs = APIMessage;

class StaticMessageProvider extends ResourceProvider<Inputs, Outputs> {
  compareKeys: (keyof Inputs & keyof Outputs)[] = [
    "content",
    "embeds",
    "components",
    "attachments",
  ];

  stableKeys: (keyof Inputs | keyof Outputs)[] = ["id"];

  replaceKeys: (keyof Inputs | keyof Outputs)[] = ["channel_id"];

  async create({ channel_id, ...inputs }: Inputs) {
    const message = await this.client.channel.createMessage(
      channel_id.toString(),
      inputs
    )!;

    return { id: message.id, outs: message };
  }

  async delete(_id: string, props: Outputs) {
    await this.client.channel.deleteMessage(props.channel_id, props.id);
  }

  async read(id: string, props: Outputs) {
    const result = await this.client.channel.getChannelMessage(
      props.channel_id,
      props.id
    )!;

    return { id, props: result };
  }

  async update(_id: string, olds: Outputs, { channel_id, ...news }: Inputs) {
    const channel = await this.client.channel.editMessage(
      channel_id.toString(),
      olds.id,
      news
    );

    return { outs: channel };
  }
}

export class StaticMessage extends DynamicResource {
  public readonly name!: pulumi.Output<string>;

  constructor(
    name: string,
    args: Inputs,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super(new StaticMessageProvider(name), `StaticMessage:${name}`, args, opts);
  }
}
