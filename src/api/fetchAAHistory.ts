import axios from "axios";
import { API_HOST } from "../../config";

import { ITickers } from "@/interfaces/tickers.interface";

export default async function fetchAAHistory(
  poolAddress: string, type?: string
): Promise<ITickers> {
  const { data } = await axios.get(`${API_HOST}/api/v1/history/${poolAddress}`, { params: { type } });

  return data;
}
