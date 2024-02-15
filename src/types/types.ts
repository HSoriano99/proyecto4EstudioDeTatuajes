export interface CreateClientRequestBody {
  username: string;
  email: string;
  password: string;
  first_name: string;
  phone_number: string;
  user_id: number;
}

export interface CreateArtistRequestBody {
  username: string;
  email: string;
  password: string;
  first_name: string;
  phone_number: string;
  tattoo_style: string;
  user_id: number;
}

export interface LoginUserRequestBody {
  email: string;
  password: string;
}

export interface TokenData {
  userId: string;
  userRoles: string;
}

export interface CreateAppointmentsRequestBody {
  artist_id: number;
  client_id: number;
  date: Date;
  shift: string;
}
