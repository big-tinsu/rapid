export interface GenericResponse<T> {
  message: string;
  data: T;
}

export interface Pagination<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  search?: string;
}