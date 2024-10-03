// src/api.ts
import axios from 'axios';
import { StatusGuildResponse, PlayersResponse, HistoryResponse, AwardsResponse, WelcomeResponse, NewsResponse, ApiResponse, UserResponse, UserData, LoginResponse, NewMemberResponse } from './components/types';

const API_URL = 'http://localhost:3006'; // ou qualquer outra URL da sua API


export const getGuildStatus = async (): Promise<StatusGuildResponse[]> => {
  const response = await axios.get<StatusGuildResponse[]>(`${API_URL}/information/status`);
  return response.data;
};

export const getGuildHistory = async (): Promise<HistoryResponse[]> => {
  const response = await axios.get<HistoryResponse[]>(`${API_URL}/history`);
  return response.data;
};


export const getGuildAwards = async (): Promise<AwardsResponse[]> => {
  const response = await axios.get<AwardsResponse[]>(`${API_URL}/awards`);
  return response.data;
};

export const getGuildNews = async (): Promise<NewsResponse[]> => {
  const response = await axios.get<NewsResponse[]>(`${API_URL}/information/news`);
  return response.data;
};

export const getGuildWelcomeText = async (): Promise<WelcomeResponse[]> => {
  const response = await axios.get<WelcomeResponse[]>(`${API_URL}/information/welcome`);
  return response.data;
};

export const getPlayersFromGuild = async (): Promise<PlayersResponse[]> => {
  const response = await axios.get<PlayersResponse[]>(`${API_URL}/members`);
  return response.data;
}

export const getNewsPlayersFromGuild = async (): Promise<PlayersResponse[]> => {
  const response = await axios.get<PlayersResponse[]>(`${API_URL}/information/newmembers`);
  return response.data;
}

export const registerUser = async (userData: UserData): Promise<UserData> => {
  const response = await axios.post<ApiResponse<UserData>>(`${API_URL}/register`, userData);
  return response.data.data;
};

export const registerNewMember = async (memberData: NewMemberResponse) => {
  console.log('Dados enviados para a API:', memberData); // Adiciona log para verificar os dados
  const response = await axios.post<ApiResponse<NewMemberResponse>>(`${API_URL}/newmember`, memberData);
  return response.data.data;
}

export const deleteMember = async (name: string) => {
  const response = await axios.delete<ApiResponse<NewMemberResponse>>(`${API_URL}/newmember`, {
    data: { name }, // Passando o nome no corpo da requisição
  });
  return response.data;
}


export const loginUser = async (userData: Omit<UserData, 'user_name'>): Promise<string> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/login`, userData);
  return response.data.token; // Retorna diretamente o token
};


export const getUser = async (token: string): Promise<UserResponse> => {
  try {
    const response = await axios.get<UserResponse>(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}` // Adiciona o token aos headers da requisição
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error; // Rejeita a promessa em caso de erro
  }
};




