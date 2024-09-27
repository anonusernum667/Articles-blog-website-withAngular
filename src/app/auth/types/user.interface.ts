export  interface user {
  user: {
    email: string;
    username: string
    bio?: string | null
    image?: string | null
    token: string
}
}
export  interface UpdateUser {
  user: {
    email: string;
    username: string
    bio?: string | null
    image?: string | null
    password: string
}
}

interface AuthUser {
  email: string;
  password: string;

}

export  interface ResponseUserInterface {
  CurrentUser:user
}
export interface LoginRequestUserInterface {
  user: {
    email: string;
    password: string;
  };
}
export interface SignUpRequestUserInterface {
  user: {
    username:string
    email: string;
    password: string;
  };
}

export interface ApiErrorResponse {
  errors: {
    [key: string]: string[]; // This will capture any error field dynamically
  };
}
