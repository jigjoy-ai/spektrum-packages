export type Credentials =
  | { kind: "bearer"; token: string }
  | { kind: "internal"; token: string }
  | { kind: "none" }

export type CredentialsProvider = () => Credentials

export type HeaderMap = Record<string, string>