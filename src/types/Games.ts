import { Pagination } from "./Response";

export interface GetGamesListResponseData {
  success: boolean;
  data: Pagination<Game>;
  message: string;
}

export interface Game {
  id: string;
  name: string;
  gameId: string;
  provider: string;
  logoURL: string;
  bannerURL: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetWinnersResponseData {
  success: boolean;
  data: Winner[];
}

export interface Winner {
  id: string;
  game: string;
  amount: number;
  createdAt: Date;
  username: string;
}

export interface GetPlayerTokenBody {
  gameType: string;
}

export interface GetPlayerTokenResponse {
  success: boolean;
  data: string;
  status: boolean;
  message: string;
}
  