const RAW_API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL ||
  "https://backend-of-ead-lms.vercel.app";

export const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, "");

function buildApiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  // Avoid double "/api" if base already ends with "/api" and path starts with "/api"
  if (API_BASE_URL.endsWith("/api") && normalizedPath.startsWith("/api")) {
    return `${API_BASE_URL}${normalizedPath.replace(/^\/api/, "")}`;
  }
  return `${API_BASE_URL}${normalizedPath}`;
}

export function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) {
    (headers as any).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildApiUrl(path), { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data?.success === false) {
    const message = (data && (data.error || data.message)) || res.statusText;
    throw new Error(message);
  }
  return data as T;
}

export async function apiFetchForm<T = any>(
  path: string,
  formData: FormData,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    ...(options.headers || {}),
  };
  if (token) {
    (headers as any).Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildApiUrl(path), {
    method: options.method || "POST",
    body: formData,
    headers,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || (data && data.success === false)) {
    const message = (data && (data.error || data.message)) || res.statusText;
    throw new Error(message);
  }
  return data as T;
}

export async function apiFetchWithFallback<T = any>(
  paths: string[],
  options: RequestInit = {}
): Promise<T> {
  let lastError: any = null;
  for (const candidate of paths) {
    try {
      const result = await apiFetch<T>(candidate, options);
      return result;
    } catch (err: any) {
      lastError = err;
      // Try next candidate only on not found; otherwise rethrow
      if (!/not\s*found|404/i.test(err?.message || "")) {
        throw err;
      }
    }
  }
  throw lastError || new Error("All endpoint candidates failed");
}
