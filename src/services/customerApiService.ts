import { ApiService } from "@/services/apiService";
import { GetCustomerResponse, UpdateCustomerProfileBody } from "@/types/Customer";

export class CustomerApiService {
  public async getCustomerProfile(userId: string): Promise<GetCustomerResponse> {
    const response = await ApiService.request.get(`/api/v1/auth/user/${userId}`);

    return response.data;
  }

  public async updateCustomerProfile(data: UpdateCustomerProfileBody): Promise<GetCustomerResponse> {
    const response = await ApiService.request.post("/api/v1/auth/updateprofile", data);

    return response.data;
  }
}
