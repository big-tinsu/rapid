import { PaginationParams } from "../Response";

export interface Bet {
  id: string;
  createdAt: Date;
  reference: string;
  gameType: string;
  roundId: string;
  amount: number;
  cashoutAmount: number;
  sessionId: string;
  provider: string;
  hasEnded: boolean;
}

export interface BetQueryParams extends PaginationParams {
  reference?: string;
  gameType?: string;
  roundId?: string;
  amount?: number;
  sessionId?: string;
  provider?: string;
  hasEnded?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface MostRecentWins {
  id: string;
  game: string;
  amount: string;
  createdAt: Date;
  username: string;
}
