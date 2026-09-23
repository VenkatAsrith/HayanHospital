import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "hayan-hospital-super-secret-jwt-key-2026-kodad";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "hayan@2026";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@hayanhospital.com";
const TOKEN_NAME = "hayan_admin_session";

export interface AdminPayload {
  email: string;
  role: "admin";
  iat?: number;
  exp?: number;
}

export function verifyAdminCredentials(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function signAdminToken(email: string): string {
  return jwt.sign({ email, role: "admin" }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export { TOKEN_NAME, ADMIN_EMAIL };
