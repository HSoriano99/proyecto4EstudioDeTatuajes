export interface CreateClientRequestBody {
    username: string;
    email: string;
    password_hash: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
 }
 