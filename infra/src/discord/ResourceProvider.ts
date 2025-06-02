import * as pulumi from "@pulumi/pulumi";
import { SnowTransfer } from "snowtransfer";

export abstract class ResourceProvider
  implements pulumi.dynamic.ResourceProvider
{
  name: string;
  token: string = "";
  serverId: string = "";

  client?: SnowTransfer;

  constructor(name: string) {
    this.name = name;
  }

  async configure(req: pulumi.dynamic.ConfigureRequest) {
    this.token = req.config.get("discordToken") ?? "";
    this.serverId = req.config.get("serverId") ?? "";

    const client = new SnowTransfer(this.token);
    this.client = client;
  }

  abstract create(inputs: pulumi.Inputs): Promise<pulumi.dynamic.CreateResult>;
}
