import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import { backend_secret_key } from "./constant";

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS = {
  credentials: async (user, account, profile, email, credentials) => {
    // Authentication is already performed in `CredentialsProvider.authorize()` function
    return true;
  },
};

const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // The data returned from this function is passed forward as the
      // `user` variable to the signIn() and jwt() callback
      async authorize(credentials, req) {
        try {
          const response = await axios({
            url: process.env.NEXTAUTH_BACKEND_URL + "/auth/login/",
            method: "post",
            data: credentials,
            headers: {
              "Content-Type": "application/json",
              "X-Frontend-Secret-Key": backend_secret_key, // Add your secret key here
            },
          });
          const data = response.data;
          if (data) return data;
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
      return SIGN_IN_HANDLERS[account.provider](
        user,
        account,
        profile,
        email,
        credentials
      );
    },
    async jwt({ user, token, account }) {
      // If `user` and `account` are set that means it is a login/sign in event
      if (user && account) {
        let backendResponse =
          account.provider === "credentials" ? user : account.meta;
        token["user"] = backendResponse.user;
        token["access_token"] = backendResponse.access;
        token["refresh_token"] = backendResponse.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }
      // Refresh the backend token if necessary
      if (getCurrentEpochTime() > token["ref"]) {
        const response = await axios({
          method: "post",
          url: process.env.NEXTAUTH_BACKEND_URL + "/auth/token/refresh/",
          data: {
            refresh: token["refresh_token"],
          },
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Secret-Key": backend_secret_key, // Add your secret key here
          },
        });
        token["access_token"] = response.data.access;
        token["refresh_token"] = response.data.refresh;
        token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      }
      // TODO: Implement Google refresh token rotation
      // This can be implemented in a similar way as the backend token rotation.
      // For reference check out: https://authjs.dev/guides/basics/refresh-token-rotation
      return token;
    },
    // We're using JWT instead of database, so we are forced to pass
    // backend's `access_token` and `refresh_token` to the client
    async session({ token }) {
      return token;
    },
  },
};
