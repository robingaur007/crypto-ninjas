import axios from "axios";
import { CoinMarketData } from "../types/coin-market-data";
import { CoinSummary } from "../types/coin-item";

const baseAPIURL: string = `${import.meta.env.VITE_COIN_GECKO_API_URL}`;
const apiKey: string = `${import.meta.env.VITE_CRYPTO_API_KEY}`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": apiKey,
  },
};

const mapCoinListToCoinSummaryList = (
  coinList: CoinMarketData[]
): CoinSummary[] => {
  return coinList.map((coin) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    image: coin.image,
    desc: "",
    price_change_percentage_24h: coin.price_change_percentage_24h,
    total_volume: coin.total_volume,
    current_price: coin.current_price,
    market_cap: coin.market_cap,
  }));
};

export const getCoins = async (): Promise<CoinSummary[] | undefined> => {
  try {
    const response = await axios.get<CoinMarketData[]>(
      `${baseAPIURL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      options
    );
    const coinList = response.data;

    // Map the fetched data to the required coin summary type
    const coinSummary = mapCoinListToCoinSummaryList(coinList);
    return coinSummary;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return undefined;
  }
};
