import { StaticMessage } from "../discord/resources/StaticMessage";
import * as fs from "node:fs";
import * as path from "node:path";

const CID_about = "1379414775397617764";
const CID_rules = "1377600361887432714";

const rules01Txt = fs
  .readFileSync(path.join(__dirname, "rules-01.md"))
  .toString();

const rules02Txt = fs
  .readFileSync(path.join(__dirname, "rules-02.md"))
  .toString();

const welcomeTxt = fs
  .readFileSync(path.join(__dirname, "welcome.md"))
  .toString();

const principlesTxt = fs
  .readFileSync(path.join(__dirname, "principles.md"))
  .toString();

const resourcesTxt = fs
  .readFileSync(path.join(__dirname, "resources.md"))
  .toString();

const rules01Msg = new StaticMessage("rules", {
  channel_id: CID_rules,
  content: rules01Txt,
});

new StaticMessage(
  "rules_2",
  { channel_id: CID_rules, content: rules02Txt },
  { dependsOn: rules01Msg }
);

const welcomeMsg = new StaticMessage("welcome", {
  channel_id: CID_about,
  content: welcomeTxt,
});

const principlesMsg = new StaticMessage(
  "principles",
  { channel_id: CID_about, content: principlesTxt },
  { dependsOn: welcomeMsg }
);

new StaticMessage(
  "resources",
  { channel_id: CID_about, content: resourcesTxt },
  { dependsOn: principlesMsg }
);
