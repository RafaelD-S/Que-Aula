import type { ExpandParam } from "./models";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || "/api";

type RequestConfig = {
  expand?: ExpandParam;
  query?: Record<string, string | number | boolean | undefined | null>;
};

export class ApiError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

const normalizeExpand = (expand: ExpandParam): string | undefined => {
  if (!expand) {
    return undefined;
  }

  return Array.isArray(expand) ? expand.join(",") : expand;
};

const buildUrl = (path: string, config?: RequestConfig): string => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const url = API_BASE_URL.startsWith("http")
    ? new URL(`${API_BASE_URL}${normalizedPath}`)
    : new URL(`${API_BASE_URL}${normalizedPath}`, window.location.origin);

  const expand = normalizeExpand(config?.expand);

  if (expand) {
    url.searchParams.set("expand", expand);
  }

  const query = config?.query;

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        return;
      }

      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

const parseResponseBody = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  return text.length > 0 ? text : null;
};

export const request = async <T>(path: string, config?: RequestConfig): Promise<T> => {
  const response = await fetch(buildUrl(path, config));

  const payload = await parseResponseBody(response);

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`;

    const message =
      typeof payload === "object" && payload !== null && "message" in payload
        ? String((payload as { message?: unknown }).message ?? fallbackMessage)
        : fallbackMessage;

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
};
