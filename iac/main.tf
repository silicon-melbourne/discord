provider "discord" {}

data "discord_local_image" "logo" {
  file = "assets/logo.png"
}

resource "discord_managed_server" "silicon_melbourne" {
  server_id = "1377448057179865169"
  name      = "Silicon Melbourne"
  region    = "sydney"

  icon_data_uri = data.discord_local_image.logo.data_uri

  default_message_notifications = 1
  verification_level            = 1
  explicit_content_filter       = 2
}

module "channels" {
  source    = "./channels"
  server_id = discord_managed_server.silicon_melbourne.server_id
}
