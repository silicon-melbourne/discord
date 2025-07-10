import type {
  VideoQualityMode,
  ForumLayoutType,
  SortOrderType,
  APIOverwrite,
  Snowflake,
  APIGuildForumDefaultReactionEmoji,
} from "discord-api-types/v10";

interface BaseCreateChannelParams {
  name: string;
  position?: number;
  permission_overwrites?: APIOverwrite[];
}

export interface CreateTextChannelParams extends BaseCreateChannelParams {
  topic?: string;
  rate_limit_per_user?: number;
  default_auto_archive_duration?: number;
}

export interface CreateVoiceChannelParams extends BaseCreateChannelParams {
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string;
  video_quality_mode?: VideoQualityMode;
}

export interface CreateCategoryChannelParams extends BaseCreateChannelParams {
  parent_id?: never;
}

export interface CreateAnnouncementChannelParams
  extends BaseCreateChannelParams {
  topic?: string;
  rate_limit_per_user?: number;
  nsfw?: boolean;
  default_auto_archive_duration?: number;
}

export interface CreateStageVoiceChannelParams extends BaseCreateChannelParams {
  bitrate?: number;
  rtc_region?: string;
  video_quality_mode?: VideoQualityMode;
  topic?: string;
}

// export interface APIGuildForumDefaultReactionEmoji {
//   emoji_id?: Snowflake;
//   emoji_name: string;
// }

export interface APIGuildForumTag {
  id?: Snowflake;
  name: string;
  moderated: boolean;
  emoji_id?: Snowflake;
  emoji_name?: string;
}

export interface CreateForumChannelParams extends BaseCreateChannelParams {
  topic?: string;
  rate_limit_per_user?: number;
  available_tags?: APIGuildForumTag[];
  default_reaction_emoji?: APIGuildForumDefaultReactionEmoji;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: SortOrderType;
  default_forum_layout?: ForumLayoutType;
  default_auto_archive_duration?: number;
}

export interface CreateMediaChannelParams extends BaseCreateChannelParams {
  topic?: string;
  available_tags?: APIGuildForumTag[];
  default_reaction_emoji?: APIGuildForumDefaultReactionEmoji;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: SortOrderType;
  default_auto_archive_duration?: number;
}

export type CreateGuildChannelParams =
  | CreateTextChannelParams
  | CreateVoiceChannelParams
  | CreateCategoryChannelParams
  | CreateAnnouncementChannelParams
  | CreateStageVoiceChannelParams
  | CreateForumChannelParams
  | CreateMediaChannelParams;
