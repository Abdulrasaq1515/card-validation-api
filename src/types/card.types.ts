export interface ValidateCardRequest {
  cardNumber: string;
}

export interface ValidateCardResponse {
  valid: boolean;
  cardNetwork: string | null;
  message: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
}
