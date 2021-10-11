import admin from "../admin";

//非同期にしないとuid >> undefined
export const checkAuth = (idToken: any) => {
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      //console.log(decodedToken.uid);
      const user = decodedToken;
      //console.log(user)
      return user;
    })
    .catch((err) => {
      console.log(err.message);
      return 0
    });
};
