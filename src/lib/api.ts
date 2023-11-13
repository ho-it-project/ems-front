export async function api<T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> {
  return fetch(input, init).then((res) => {
    return res.json() as Promise<T>;
  });
}
