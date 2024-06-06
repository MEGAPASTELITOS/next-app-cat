export type UserWindTokens  = Users & Tokens

  export interface Users {
    id: number;
    userName: string;
    name: string;
    email: string;
    role: Role;
    createdAt: Date
    updatedAt: Date
  };

  export type Tokens = {
    accessToken: string;
    refreshToken: string;
};

export type accessToken = {
    accessToken: string;
};
