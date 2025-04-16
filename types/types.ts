export type ButtonVariant = "primary" | "secondary" | "destructive" | "default";
export type TextVariant = "primary" | "secondary" | "default";

export type ApiErrorResponse = {
  message: string;
};

export type FitMatchUser = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  isBot: boolean;
};
