export interface Bet {
  id: string;
  userId: string;
  game?: string;
  roundId?: string;
  stake: number;
  winnings: number;
  result: 'won' | 'lost';
  createdAt: string;
  updatedAt: string;
  wallet: number;
}

export interface BetsState {
  bets: Bet[];
  betsPagination: {
    total: number;
    totalPages: number;
    page: number;
    pageSize: number;
  };
  getBets: (userId: string, page: number) => Promise<void>;
}

export interface BetsResponse {
  success: boolean;
  message: string;
  result: Bet[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
} 