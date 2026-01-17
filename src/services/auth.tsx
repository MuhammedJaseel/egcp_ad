import { api } from "./config";

interface VerifyDto {
  email: string;
  password: string;
}

interface VerifyResDto {
  token: string;
}

interface LoginDto {
  otp: string;
  token: string;
}

interface LoginResDto {
  token: string;
}

export async function verifyAdmin(body: VerifyDto): Promise<VerifyResDto> {
  let res = await api.post("auth/login", body);
  return res.data;
}

export async function loginAdmin(body: LoginDto): Promise<LoginResDto> {
  let res = await api.post("auth/admin/login", body);
  return res.data;
}
