locals {
  category_id = discord_category_channel.programming_languages.channel_id
}

resource "discord_category_channel" "programming_languages" {
  name      = "Programming Languages"
  server_id = var.server_id
}

resource "discord_text_channel" "typescript" {
  name                     = "typescript"
  category                 = local.category_id
  sync_perms_with_category = true
  server_id                = var.server_id
}

resource "discord_text_channel" "javascript" {
  name                     = "javascript"
  category                 = local.category_id
  sync_perms_with_category = true
  server_id                = var.server_id
}

resource "discord_text_channel" "rust" {
  name                     = "rust"
  category                 = local.category_id
  sync_perms_with_category = true
  server_id                = var.server_id
}

resource "discord_text_channel" "go" {
  name                     = "go"
  category                 = local.category_id
  sync_perms_with_category = true
  server_id                = var.server_id
}

resource "discord_text_channel" "java" {
  name                     = "java"
  category                 = local.category_id
  sync_perms_with_category = true
  server_id                = var.server_id
}
