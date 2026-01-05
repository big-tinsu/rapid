import api from "@/libs/axios";
import { Game, GameQueryParams } from "@/types/new/game";
import { GenericResponse, Pagination } from "@/types/Response";

export async function getGames(params: GameQueryParams) {
  try {
    const response = await api.get(`/v1/games`, {
      params,
    });
    const { data } = response.data as GenericResponse<Pagination<Game>>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export async function initiatePlayerGameSession(payload: {
  gameType: string;
  demo?: boolean;
}) {
  try {
    const response = await api.post(`/v1/studios/shacks-tokenize`, payload);
    const { data } = response.data as GenericResponse<string>;
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}
