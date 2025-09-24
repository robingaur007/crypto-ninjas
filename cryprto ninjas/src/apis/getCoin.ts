import axios from "axios";
import { CoinDetails } from "../types/coin-details";
import { CoinSummary } from "../types/coin-item";

const baseAPIURL = `${import.meta.env.VITE_COIN_GECKO_API_URL}`;
const apiKey = `${import.meta.env.VITE_CRYPTO_API_KEY}`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": apiKey,
  },
};

// Function to map CoinDetails to CoinSummary
const mapCoinDetailsToSummary = (coinDetails: CoinDetails): CoinSummary => {
  return {
    id: coinDetails.id,
    name: coinDetails.name,
    symbol: coinDetails.symbol,
    image:
      typeof coinDetails.image === "string"
        ? coinDetails.image
        : coinDetails.image.large,
    desc: coinDetails.description.en,
    price_change_percentage_24h:
      coinDetails.market_data.price_change_percentage_24h,
    total_volume: coinDetails.market_data.total_volume.usd,
    current_price: coinDetails.market_data.current_price.usd,
    market_cap: coinDetails.market_data.market_cap.usd,
  };
};

export const getCoin = async (id: string): Promise<CoinSummary | undefined> => {
  try {
    const response = await axios.get<CoinDetails>(
      `${baseAPIURL}/coins/${id}`,
      options
    );
    const coinDetails = response.data;

    // Map the fetched data to the required summary structure
    const coinSummary = mapCoinDetailsToSummary(coinDetails);

    return coinSummary;
  } catch (error) {
    console.error("Error fetching coin data:", error);
    return undefined;
  }
};
