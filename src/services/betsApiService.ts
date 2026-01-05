import { ApiService } from './apiService';
import { BetsResponse } from '@/types/Bets';

export class BetsApiService {
  public async getBets(userId: string, pageSize: number): Promise<BetsResponse> {
    try {
      const endpoint = `/v1/bets`;

      const response = await ApiService.request.get(endpoint, {
        params: {
          pageSize,
          limit: 20,
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to fetch bets');
      }

      return response.data;
    } catch (error: any) {
      console.error('Error fetching bets:', error);
      throw error;
    }
  }
} 