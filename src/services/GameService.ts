import { ApiService } from "./apiService";
import {
  GetGamesListResponseData,
  GetPlayerTokenBody,
  GetPlayerTokenResponse,
  GetWinnersResponseData,
} from "../types/Games";

export class GamesApiService {
  public async getGames(page: number, search?: string): Promise<GetGamesListResponseData> {
    const response = await ApiService.request.get(`/v1/games`, {
      params: {
        page,
        search,
        pageSize: 20,
      },
    });


    return response.data;
  }

  public async getLatestWinners(): Promise<GetWinnersResponseData> {
    const response = await ApiService.request.get(`/v1/bets/most-recent-wins`);

    return response.data;
  }

  public async getPlayerToken(data: GetPlayerTokenBody, demo?: boolean): Promise<GetPlayerTokenResponse> {
    const response = await ApiService.request.post(`/v1/studios/shacks-tokenize?demo=${demo}`, data);

    return response.data;
  }
}
