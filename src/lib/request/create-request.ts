/* eslint-disable @typescript-eslint/no-explicit-any */
import { generatePath, ParamParseKey } from "react-router-dom";
import Cookies from "universal-cookie";

import { createRequestBody } from "./create-request-body";

type RequestMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type RequestType = "json" | "file";

type RequestInput<Path extends string> = {
  headers?: Headers;
  body?: Record<string, any>;
  params?: Record<ParamParseKey<Path>, string>;
  query?: URLSearchParams;
  requestInit?: RequestInit;
  type?: RequestType;
};

export const createRequest =
  <Path extends string>(method: RequestMethods, url: Path) =>
  async <T>(input?: RequestInput<Path>, schema?: any): Promise<T> => {
    const headers = new Headers(input?.headers);

    const inputType = input?.type ?? "json";
    const cookies = new Cookies();
    const token = cookies.get("refreshToken");

    if (inputType === "json") {
      headers.set("Content-Type", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    const requestInit = {
      method,
      body: createRequestBody(input?.body, inputType),
      headers,
      ...input?.requestInit,
    };

    const apiUrl = input?.params ? generatePath(url, input.params) : url;

    const res = await fetch(
      input?.query ? `${apiUrl}?${input.query}` : apiUrl,
      requestInit
    );

    // Handle non-OK responses
    if (!res.ok) {
      let errorMessage = `Request failed with status ${res.status}`;
      try {
        const errorData = await res.json();
        // Try to extract error message from common API response formats
        errorMessage = errorData.message || errorData.error || errorData.detail || JSON.stringify(errorData);
      } catch {
        // If response is not JSON, use status text
        errorMessage = res.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (schema) {
      const json = await res.json();

      const parsed = schema.safeParse(json);

      if (!parsed.success) {
        const { error } = parsed;
        const errorMessages = error.issues
          .map(
            (issue: { message: any; path: any[] }) =>
              `${issue.message} - ${issue.path.join("->")}`
          )
          .join(", ");

        console.error(errorMessages);
      }

      return parsed.data;
    }

    return res.json();
  };
