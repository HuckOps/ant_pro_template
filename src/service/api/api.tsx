import { createRequest } from "@/utils/request";

const apiRequest = createRequest("/api");
export async function currentUser() {
  return await apiRequest.get<API.currentUser>("/currentUser");
}

export async function login(values: any) {
  return await apiRequest.post<API.login>("/login", values);
}
