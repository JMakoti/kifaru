/**
 * Extract EXACT backend error message(s)
 */
export function extractErrorMessage(error: any): string {
  const data = error?.response?.data;

  if (typeof data?.message === "string") {
    return data.message;
  }

  if (typeof data === "object" && data !== null) {
    return Object.values(data).flat().filter(Boolean).join(" ");
  }

  return "Unknown error occurred";
}
