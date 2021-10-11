import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const express = require("express");
import * as fs from "fs";
import * as https from "https";
import * as http from "http";

//graphql
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

//MongoDB
let MONGODB: any = process.env.MONGODB_URI;
let port = process.env.PORT || 4003;

async function startApolloServer() {
  const configurations: any = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port, hostname: "localhost" },
    development: { ssl: false, port, hostname: "localhost" },
  };

  const environment = process.env.NODE_ENV || "production";
  const config = configurations[environment];
  const crypt_key = process.env.CRYPT_KEY_PATH || ""
  const crypt_cert = process.env.CRYPT_CERT_PATH || ""

  const server = new ApolloServer({
    schema: buildFederatedSchema({
      typeDefs,
      resolvers,
    }),
    context: ({ req }) => ({
      AuthContext: req.headers.authorization,
    }),
  });

  let httpServer: any;

  const serverStart = async () => {
    await server.start();
    const app = express();
    server.applyMiddleware({ app });

    if (config.ssl) {
      httpServer = https.createServer(
        {
          key: fs.readFileSync(crypt_key),
          cert: fs.readFileSync(crypt_cert),
        },
        app
      );
    } else {
      httpServer = http.createServer(app);
    }
  };

  mongoose
    .connect(MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
      return serverStart();
    })
    .then(() => {
      new Promise((resolve) => httpServer.listen({ port }, resolve));
      console.log(
        "🚀 Server ready at",
        `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
          server.graphqlPath
        }`
      );
    })
    .catch((err) => {
      console.log(err);
    });
}

startApolloServer();

//server.listen(4001).then(({ url }: URL) => {
//    console.log(`Server has running on ${url}`)
//})
