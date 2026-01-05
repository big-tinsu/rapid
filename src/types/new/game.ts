import { PaginationParams } from "../Response";

export interface Game {
  id: string;
  name: string;
  gameId: string;
  provider: string;
  logoURL: string;
  bannerURL: string;
  launchURL: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameQueryParams extends PaginationParams {
  name?: string;
  gameId?: string;
  provider?: string;
}
