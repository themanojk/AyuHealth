export interface ILoginRequestState {
  type: String;
  otp: string;
}

export interface ILoginSuccessState {
  type: String;
  otp: string;
}

interface IResponse {
  token: String;
}

export interface ILoginResponseState {
  type: String;
  response: IResponse;
}
