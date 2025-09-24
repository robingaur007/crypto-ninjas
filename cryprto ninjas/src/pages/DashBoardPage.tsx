import { useEffect, useState } from "react";
import TopButton from "../components/common/back-to-top/TopButton";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import Loader from "../components/common/loader/Loader";
import PaginationController from "../components/dashboard/pagination/PaginationController";
import SearchComponent from "../components/dashboard/search/Search";
import TabsComponent from "../components/dashboard/tabs/Tabs";
import { getCoins } from "../apis/getCoins";
import { CoinSummary } from "../types/coin-item";

function DashboardPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [coins, setCoins] = useState<CoinSummary[]>([]);
  const [search, setSearch] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [paginatedCoins, setPaginatedCoins] = useState<CoinSummary[]>([]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    const startingIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(startingIndex, startingIndex + 10));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getCoins();
      if (data) {
        setCoins(data);
        setPaginatedCoins(data.slice(0, 10));
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <>
      <TopButton />
      {loading ? (
        <Loader />
      ) : (
        <div style={{ minHeight: "90vh" }}>
          <Header />
          <SearchComponent search={search} onChange={onChange} />
          <TabsComponent
            coins={search ? filteredCoins : paginatedCoins}
            setSearch={setSearch}
          />
          {!search && (
            <PaginationController
              pageNumber={pageNumber}
              handleChange={handlePageChange}
            />
          )}
        </div>
      )}
      <Footer />
    </>
  );
}

export default DashboardPage;
