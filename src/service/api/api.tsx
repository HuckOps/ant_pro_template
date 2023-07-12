import { createRequest } from "@/utils/request";

const apiRequest = createRequest("/api");
export async function currentUser() {
  return await apiRequest.get("/currentUser");
}
