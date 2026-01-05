export interface apiResponse {
  data?: any;
  error?: apiError;
  message: string;
  status: boolean;
}

export interface apiError {
  success: boolean;
  errors: string[];
  message?: string;
}

export interface Pagination {
  totalCount: number;
  totalPages: number;
  page: string;
  limit: string;
}
