export namespace SignIn {
  export type Payload = {
    username: string;
    password: string;
  };

  export type Response = {
    token: string;
    success: boolean;
  };
}
