import { Cliente } from './cliente';

export interface PaginationResponse {
  page: number;
  limit: number;
  totalPages: number;
  data: Cliente[];
}
