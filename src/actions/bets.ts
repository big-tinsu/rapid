import api from "@/libs/axios";
import { Bet, BetQueryParams, MostRecentWins } from "@/types/new/bet";
import { GenericResponse, Pagination } from "@/types/Response";

export async function getBets(params: BetQueryParams) {
  try {
    const response = await api.get(`/v1/bets`, {
      params,
    });
    const { data } = response.data as GenericResponse<Pagination<Bet>>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function getMostRecentWins() {
  try {
    const response = await api.get(`/v1/bets/most-recent-wins`);
    const { data } = response.data as GenericResponse<MostRecentWins[]>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
