import { AxiosError } from "axios";

type ErrorResponseData = {
  message?: string | string[];
  [key: string]: string | string[] | undefined;
};

export function extractErrorMessage(error: unknown): string {
  if (error instanceof AxiosError && error.response?.data) {
    const data = error.response.data as ErrorResponseData;

    if (typeof data.message === "string") {
      return data.message;
    }

    if (Array.isArray(data.message)) {
      return data.message.filter(Boolean).join(" ");
    }

    return Object.values(data)
      .flatMap((v) => (Array.isArray(v) ? v : [v]))
      .filter(Boolean)
      .join(" ");
  }

  return "Unknown error occurred";
}
