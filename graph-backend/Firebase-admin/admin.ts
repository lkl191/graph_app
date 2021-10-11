import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
dotenv.config();

let path =
  "/home/node03/dev/frameworks/next/graph/graph-backend/Firebase-admin/graph-app-add8f-firebase-adminsdk-ipfjp-48d051117e.json";

const environment = process.env.NODE_ENV || "production";

if (environment == "production") {
  path =
    "/home/vhosts/genbu.shishin.nara.jp/backend02/Firebase-admin/graph-app-add8f-firebase-adminsdk-ipfjp-48d051117e.json";
}

let serviceAccount = require(path);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//export GOOGLE_APPLICATION_CREDENTIALS="/home/node03/dev/frameworks/next/graph/graph-app-backend_02/Firebase-admin/graph-app-add8f-firebase-adminsdk-ipfjp-48d051117e.json"
//admin.initializeApp()

export default admin;
