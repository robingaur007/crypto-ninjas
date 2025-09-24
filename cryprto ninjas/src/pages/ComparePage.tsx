import React, { useEffect, useState } from "react";
import CoinInfo from "../components/coin/coin-info/CoinInfo";
import LineChart from "../components/coin/line-chart/LineChart";
import PriceToggle from "../components/coin/price-toggle/PriceToggle";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import Loader from "../components/common/loader/Loader";
import SelectCoin from "../components/compare/select-coin/SelectCoin";
import List from "../components/dashboard/list/List";
import { getCoins } from "../apis/getCoins";
import { getCoin } from "../apis/getCoin";
import { getCoinPrices } from "../apis/getCoinPrices";
import { settingChartData } from "../utils/settingChartData";
import { CoinItem, CoinSummary } from "../types/coin-item";
import { ChartData } from "../types/chart-data";
import { SelectChangeEvent } from "@mui/material";

const ComparePage = () => {
  const [allCoins, setAllCoins] = useState<CoinItem[]>([]);
  const [coin1, setCoin1] = useState<string>(allCoins[0]?.id ?? "bitcoin");
  const [coin2, setCoin2] = useState<string>(allCoins[1]?.id ?? "ethereum");
  const [days, setDays] = useState<number>(120);
  const [coin1Data, setCoin1Data] = useState<CoinSummary>();
  const [coin2Data, setCoin2Data] = useState<CoinSummary>();
  const [loading, setLoading] = useState<boolean>(false);
  const [priceType, setPriceType] = useState<string>("prices");
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const handlePriceTypeChange = async (
    _: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setLoading(true);
    setPriceType(newType);
    const prices1 = await getCoinPrices(coin1, days, newType);
    const prices2 = await getCoinPrices(coin2, days, newType);

    // Ensure that coin1Data is defined before passing it
    if (coin1Data) {
      settingChartData(setChartData, prices1, coin1Data, coin2Data, prices2);
    }

    setLoading(false);
  };

  const handleCoinChange = async (
    e: SelectChangeEvent<string>,
    isCoin1: boolean
  ) => {
    setLoading(true);
    if (isCoin1) {
      setCoin1(e.target.value);
      const data1 = await getCoin(e.target.value);
      if (data1) setCoin1Data(data1);
      const prices1 = await getCoinPrices(e.target.value, days, priceType);
      const prices2 = await getCoinPrices(coin2, days, priceType);

      // Ensure that data1 and coin2Data are defined before passing them
      if (data1 && coin2Data) {
        settingChartData(setChartData, prices1, data1, coin2Data, prices2);
      }
    } else {
      setCoin2(e.target.value);
      const data2 = await getCoin(e.target.value);
      if (data2) setCoin2Data(data2);
      const prices1 = await getCoinPrices(coin1, days, priceType);
      const prices2 = await getCoinPrices(e.target.value, days, priceType);

      // Ensure that coin1Data and data2 are defined before passing them
      if (coin1Data && data2) {
        settingChartData(setChartData, prices1, coin1Data, data2, prices2);
      }
    }
    setLoading(false);
  };

  const handleDaysChange = async (e: SelectChangeEvent<number>) => {
    setLoading(true);
    setDays(Number(e.target.value));
    const prices1 = await getCoinPrices(
      coin1,
      Number(e.target.value),
      priceType
    );
    const prices2 = await getCoinPrices(
      coin2,
      Number(e.target.value),
      priceType
    );

    // Ensure both coin1Data and coin2Data are defined
    if (coin1Data && coin2Data) {
      settingChartData(setChartData, prices1, coin1Data, coin2Data, prices2);
    }
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getCoins();
      if (data) {
        setAllCoins(data);
      }
      const data1 = await getCoin(coin1);
      const data2 = await getCoin(coin2);
      if (data1) setCoin1Data(data1);
      if (data2) setCoin2Data(data2);
      const prices1 = await getCoinPrices(coin1, days, priceType);
      const prices2 = await getCoinPrices(coin2, days, priceType);

      // Ensure both data1 and data2 are defined
      if (data1 && data2) {
        settingChartData(setChartData, prices1, data1, data2, prices2);
      }
      setLoading(false);
    };

    getData();
  }, [coin1, coin2, days, priceType]);

  return (
    <div>
      <Header />
      {loading || !coin1Data?.id || !coin2Data?.id ? (
        <Loader />
      ) : (
        <>
          <SelectCoin
            allCoins={allCoins}
            coin1={coin1}
            coin2={coin2}
            days={days}
            handleCoinChange={handleCoinChange}
            handleDaysChange={handleDaysChange}
          />
          <div>
            <table style={{ width: "100%" }}>
              <tbody className="grey-wrapper">
                <List coin={coin1Data} delay={0.1} />
              </tbody>
              <tbody className="grey-wrapper">
                <List coin={coin2Data} delay={0.2} />
              </tbody>
            </table>
          </div>
          <div className="grey-wrapper">
            <PriceToggle
              handlePriceTypeChange={handlePriceTypeChange}
              priceType={priceType}
            />
            <LineChart
              chartData={chartData}
              multiAxis={true}
              priceType={priceType}
            />
          </div>
          <CoinInfo name={coin1Data.name} desc={coin1Data.desc} />
          <CoinInfo name={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default ComparePage;
