export interface CoinItem {
  id: string;
  symbol: string;
  name: string;
}

export interface CoinSummary {
  id: string;
  name: string;
  symbol: string;
  image: string;
  desc: string;
  price_change_percentage_24h: number;
  total_volume: number;
  current_price: number;
  market_cap: number;
}
