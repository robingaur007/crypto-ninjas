export interface Platforms {
  [key: string]: string;
}

export interface PlatformDetails {
  decimal_place: number;
  contract_address: string;
}

export interface DetailPlatforms {
  [key: string]: PlatformDetails;
}

export interface Localization {
  [key: string]: string;
}

export interface Description {
  [key: string]: string;
}

export interface Links {
  [key: string]: string | string[];
}

export interface Image {
  [key: string]: string;
}

export interface CurrentPrice {
  [key: string]: number;
}
export interface AthDateOrAtlDate {
  [key: string]: string;
}

export interface MarketData {
  current_price: CurrentPrice;
  total_value_locked?: number;
  mcap_to_tvl_ratio?: number;
  fdv_to_tvl_ratio?: number;
  roi?: number;
  ath: CurrentPrice;
  ath_change_percentage: CurrentPrice;
  ath_date: AthDateOrAtlDate;
  atl: CurrentPrice;
  atl_change_percentage: CurrentPrice;
  atl_date: AthDateOrAtlDate;
  market_cap: CurrentPrice;
  market_cap_rank: number;
  fully_diluted_valuation: CurrentPrice;
  market_cap_fdv_ratio: number;
  total_volume: CurrentPrice;
  high_24h: CurrentPrice;
  low_24h: CurrentPrice;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: CurrentPrice;
  price_change_percentage_1h_in_currency: CurrentPrice;
  price_change_percentage_24h_in_currency: CurrentPrice;
  price_change_percentage_7d_in_currency: CurrentPrice;
  price_change_percentage_14d_in_currency: CurrentPrice;
  price_change_percentage_30d_in_currency: CurrentPrice;
  price_change_percentage_60d_in_currency: CurrentPrice;
  price_change_percentage_200d_in_currency: CurrentPrice;
  price_change_percentage_1y_in_currency: CurrentPrice;
  market_cap_change_24h_in_currency: CurrentPrice;
  market_cap_change_percentage_24h_in_currency: CurrentPrice;
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  last_updated: string;
}

export interface CommunityData {
  facebook_likes?: string[] | string;
  twitter_followers: number;
  reddit_average_posts_48h: number;
  reddit_average_comments_48h: number;
  reddit_subscribers: number;
  reddit_accounts_active_48h: number;
  telegram_channel_user_count?: number;
}
export interface CodeAdditionsDeletions4Weeks {
  additions: number;
  deletions: number;
}
export interface DeveloperData {
  forks: number;
  stars: number;
  subscribers: number;
  total_issues: number;
  closed_issues: number;
  pull_requests_merged: number;
  pull_request_contributors: number;
  code_additions_deletions_4_weeks: CodeAdditionsDeletions4Weeks;
  commit_count_4_weeks: number;
  last_4_weeks_commit_activity_series?: number[];
}
export interface TickersEntity {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: ConvertedLastOrConvertedVolume;
  converted_volume: ConvertedLastOrConvertedVolume;
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url?: string;
  token_info_url?: string;
  coin_id: string;
  target_coin_id?: string;
}
export interface Market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}
export interface ConvertedLastOrConvertedVolume {
  btc: number;
  eth: number;
  usd: number;
  usd_v2?: number;
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id?: string;
  platforms: Platforms;
  detail_platforms: DetailPlatforms;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories?: string[];
  preview_listing: boolean;
  public_notice?: string;
  additional_notices?: string[];
  localization: Localization;
  description: Description;
  links: Links;
  image: Image | string;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  watchlist_portfolio_users: number;
  market_cap_rank: number;
  market_data: MarketData;
  community_data: CommunityData;
  developer_data: DeveloperData;
  status_updates?: string[];
  last_updated: string;
  tickers?: TickersEntity[];
}
