export interface dataset {
  label?: string;
  data: number[];
  borderWidth: number;
  fill: boolean;
  backgroundColor?: string;
  tension: number;
  borderColor: string;
  pointRadius: number;
  yAxisID: string;
}

export interface ChartData {
  labels: string[];
  datasets: dataset[];
}

export interface HistoricalChatData {
  prices: Array<[number, number]>;
  market_caps: Array<[number, number]>;
  total_volumes: Array<[number, number]>;
}
