// import { createAuthClient } from "better-auth/react";
// export const authClient = createAuthClient({
//   baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
// });

// export const { signIn, signUp, useSession } = createAuthClient();



import { createAuthClient } from "better-auth/react";

 
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

 
export const { signIn, signUp, useSession, signOut } = authClient;