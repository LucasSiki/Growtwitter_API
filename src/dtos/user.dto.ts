export interface CreateUserDto {
    name: string;
    email: string;
    username: string;
    password: string;
  }
  
  export interface updateUserDto {
    User_id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    token?: string | null;
  }