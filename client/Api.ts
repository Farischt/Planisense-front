export class ApiService {
  private static readonly _apiUrl = process.env.NEXT_PUBLIC_API_URL;

  public static async get<T>(path: string): Promise<T> {
    const response = await fetch(`${ApiService._apiUrl}/${path}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  public static async post<T, B = any>(path: string, body: B): Promise<T> {
    const response = await fetch(`${ApiService._apiUrl}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
}
