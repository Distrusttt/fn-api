import { request } from "undici";
import { Client } from "./index.js";

export async function httpRequest(client: Client, url: string, options?: HttpRequestOpts) {
    const { body, statusCode } = await request(url, {
        method: options?.method ?? "GET",
        headers: {
            "User-Agent": "FortniteGame/++Fortnite+Release-21.50-CL-21657658 Windows/10.0.22000.1.768.64bit",
            ...options?.authed ? { "Authorization": `bearer ${client.auths.get("IOS")?.access_token}` } : {},
            ...options?.headers
        },
        body: options?.body ?? null
    });
    return { body, statusCode };
};

interface HttpRequestOpts {
    authed: boolean;
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: string;
};

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";