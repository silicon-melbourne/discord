import { request, type RequestOptions } from "https";
import { IncomingMessage } from "http";

export interface Options {
  method?: "GET" | "POST";
  headers?: Record<string, string>;
  body?: string;
  params?: Record<string, string | undefined>;
  parseJson?: boolean;
}

export async function httpRequest<T = any>(
  url: string,
  options: Options = { method: "GET", headers: {} }
): Promise<T> {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);

    for (const param in options.params) {
      const value = options.params[param];
      if (value != null) urlObj.searchParams.set(param, value);
    }

    const requestOpts: RequestOptions = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: options.method,
      headers: options.headers,
    };

    console.debug("Talking to:", urlObj.href);

    const req = request(requestOpts, (res: IncomingMessage) => {
      let data = "";

      res.on("data", (chunk) => (data += chunk.toString()));
      res.on("end", () => {
        try {
          const result = options.parseJson !== false ? JSON.parse(data) : data;
          resolve(result as T);
        } catch (error) {
          reject(new Error(`Failed to parse response: ${error}`));
        }
      });
    });

    req.on("error", (error: Error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    if (options.body != null) req.write(options.body);

    req.end();
  });
}
