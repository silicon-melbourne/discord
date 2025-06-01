import * as pulumi from "@pulumi/pulumi";
import { ResourceProvider } from "../ResourceProvider";
import { DynamicResource } from "../DynamicResource";

interface Inputs {
  name: string;
}

interface Outputs extends Inputs {
  serverId: string;
}

class GuildProvider extends ResourceProvider {
  async create(): Promise<pulumi.dynamic.CreateResult<Outputs>> {
    return {
      id: this.serverId,
      outs: { serverId: this.serverId, name: this.guild!.name ?? "" },
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
      stables: ["serverId"],
      deleteBeforeReplace: false,
    };
  }

  async update(
    _id: string,
    olds: Outputs,
    news: Outputs
  ): Promise<pulumi.dynamic.UpdateResult<Outputs>> {
    const outs = { ...olds };

    if (olds.name !== news.name) {
      await this.guild!.setName(news.name);
      outs.name = this.guild!.name;
    }

    return { outs };
  }

  async delete(id: string, props: Outputs): Promise<void> {}
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
