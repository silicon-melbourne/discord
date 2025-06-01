import * as pulumi from "@pulumi/pulumi";

export class DynamicResource extends pulumi.dynamic.Resource {
  constructor(
    provider: pulumi.dynamic.ResourceProvider,
    name: string,
    args: any,
    opts?: pulumi.ComponentResourceOptions
  ) {
    super(provider, `sm:discord:${name}`, args, opts);
  }
}
