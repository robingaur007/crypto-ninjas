/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/coin/coin-info/CoinInfo";
import LineChart from "../components/coin/line-chart/LineChart";
import PriceToggle from "../components/coin/price-toggle/PriceToggle";
import SelectDays from "../components/coin/select-days/SelectDays";
import Footer from "../components/common/footer/Footer";
import Header from "../components/common/header/Header";
import Loader from "../components/common/loader/Loader";
import List from "../components/dashboard/list/List";
import { getCoin } from "../apis/getCoin";
import { getCoinPrices } from "../apis/getCoinPrices";
import { settingChartData } from "../utils/settingChartData";
import { ChartData } from "../types/chart-data";
import { SelectChangeEvent } from "@mui/material";
import { CoinSummary } from "../types/coin-item";

const CoinPage: React.FC = () => {
  const { id } = useParams<string>();
  const [coin, setCoin] = useState<CoinSummary>();
  const [loading, setLoading] = useState<boolean>(false);
  const [days, setDays] = useState<number>(30);
  const [priceType, setPriceType] = useState<string>("prices");
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const getCoinDetails = async () => {
      if (!id) return;
      setLoading(true);
      const data = await getCoin(id);
      if (data) {
        setCoin(data);
        const prices = await getCoinPrices(id, days, priceType);
        if (prices) {
          settingChartData(setChartData, prices, data);
          setLoading(false);
        }
      }
    };
    getCoinDetails();
  }, []);

  const handleDaysChange = async (event: SelectChangeEvent<number>) => {
    if (!id) return;
    setLoading(true);
    const selectedDays = Number(event.target.value);
    setDays(selectedDays);
    const prices = await getCoinPrices(id, selectedDays, priceType);
    if (prices && coin) {
      settingChartData(setChartData, prices, coin);
      setLoading(false);
    }
  };

  const handlePriceTypeChange = async (
    _: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    if (!id || !newType) return;
    setLoading(true);
    setPriceType(newType);
    const prices = await getCoinPrices(id, days, newType);
    if (prices && coin) {
      settingChartData(setChartData, prices, coin);
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />
      {loading || !coin?.id || !chartData ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <table>
              <tbody>
                <List coin={coin} delay={0.1} />
              </tbody>
            </table>
          </div>
          <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <PriceToggle
              handlePriceTypeChange={handlePriceTypeChange}
              priceType={priceType}
            />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <CoinInfo name={coin.name} desc={coin.desc} />
        </>
      )}
      <Footer />
    </div>
  );
};

export default CoinPage;
