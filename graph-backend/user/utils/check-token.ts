import { AuthenticationError } from "apollo-server";
import * as admin from "firebase-admin";

const checkAuth = (context: any) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    const idToken = authHeader.split("Bearer ")[1];
    if (idToken) {
      try {
        admin
          .auth()
          .verifyIdToken(idToken)
          .then((decodedToken) => {
            const uid = decodedToken.uid;
            return uid;
          })
          .catch(() => {
            throw new AuthenticationError("Token error");
          });
      } catch (err) {
        throw new AuthenticationError("Auth need header");
      }
    }
  }
};

export default checkAuth