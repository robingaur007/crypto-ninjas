import { useEffect, useState } from "react";
import Button from "../components/common/button/Button";
import Header from "../components/common/header/Header";
import Loader from "../components/common/loader/Loader";
import TabsComponent from "../components/dashboard/tabs/Tabs";
import { getCoins } from "../apis/getCoins";
import { CoinSummary } from "../types/coin-item";
import Footer from "../components/common/footer/Footer";
import { Link } from "react-router-dom";

function WatchlistPage() {
  const [coins, setCoins] = useState<string[]>([]);
  const [myWatchlist, setMyWatchlist] = useState<CoinSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Get watchlist coins from localStorage
    const storedCoins = JSON.parse(localStorage.getItem("watchlist") || "[]");
    setCoins(storedCoins);

    const getData = async () => {
      setLoading(true);
      const allCoins = await getCoins();
      if (storedCoins.length > 0 && allCoins) {
        setMyWatchlist(
          allCoins.filter((item) => storedCoins.includes(item.id))
        );
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div style={{ minHeight: "70vh" }}>
          {coins.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "60vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
                No Items in the Watchlist
              </h1>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to="/dashboard">
                  <Button text={"Dashboard"} />
                </Link>
              </div>
            </div>
          ) : (
            <div style={{ minHeight: "60vh" }}>
              <TabsComponent coins={myWatchlist} isWatchlistPage={true} />
            </div>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default WatchlistPage;
