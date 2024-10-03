export interface ApiResponse<T> {
    data: T;
    message: string;
  }


export interface StatusGuildResponse {
  id: number;
  howManyPlayers: number;
  howManyOfficers: number;
  faction: string;
  players: PlayersResponse[];
}


export interface HistoryResponse {
  id: number;
  history: string;
}


export interface AwardsResponse {
  id: number;
  awards: string;
}

export interface WelcomeResponse {
  id: number;
  welcome: string;
}

export interface NewsResponse {
  id_news: number;
  news_name: string;
  news_content: string;
  news_post_date: string;
}

export interface PlayersResponse {
  id: number;
  name: string;
  class: string;
  race: string;
  specialization: string;
  tier: string;
  note: string;
  image: string;
  ranking: string;
  date_joining: string;
}

export interface NewMemberResponse {
  name: string;
  classe: string;
  race: string;
  specialization: string;
  tier: string;
  note: string;
  image: string;
  ranking: string;
}

export  interface UserResponse {
  id_user: number;
  user_name: string;
  user_email: string;
  user_image: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface UserData {
  user_name: string;
  user_email: string;
  user_password: string;
}

export interface LoginResponse {
  token: string;
}
