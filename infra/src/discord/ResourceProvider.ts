import * as pulumi from "@pulumi/pulumi";
import { Snowflake } from "discord-api-types/v10";
import { SnowTransfer } from "snowtransfer";
import { pick } from "../utils/pick";
import * as util from "node:util";

export abstract class ResourceProvider<
  In extends Record<string, any>,
  Out extends Record<string, any>
> implements pulumi.dynamic.ResourceProvider<In, Out>
{
  name: string;
  token: string = "";
  serverId: string = "";

  client!: SnowTransfer;

  compareKeys: string[] = ["id"];
  stableKeys: string[] = [];
  replaceKeys: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  /**
   * This sets up the Discord client for use across the resource.
   */
  async configure(req: pulumi.dynamic.ConfigureRequest) {
    this.token = req.config.get("discordToken") ?? "";
    this.serverId = req.config.get("serverId") ?? "";

    const client = new SnowTransfer(this.token);
    this.client = client;
  }

  abstract create(inputs: In): Promise<pulumi.dynamic.CreateResult<Out>>;

  async delete(id: string, props: Out) {
    // We don't really want to delete anything at this stage... wait till this
    // has been setup in a test discord properly first.
    console.log("No delete's implemented!", { id, snowflakes: [props.id] });
  }

  async diff(_id: string, olds: Out, news: In) {
    const changes = !util.isDeepStrictEqual(
      pick(olds, ...this.compareKeys),
      pick(news, ...this.compareKeys)
    );

    const replaces = this.replaceKeys.filter((v) => olds[v] !== news[v]);

    return {
      changes,
      replaces: replaces,
      stables: this.stableKeys as string[],
      deleteBeforeReplace: true,
    };
  }
}
