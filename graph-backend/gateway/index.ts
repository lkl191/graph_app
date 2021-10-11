//import * as express from "express";
const express = require("express");
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import * as dotenv from "dotenv";
dotenv.config();

async function startApolloServer() {
  const configurations: any = {
    // Note: You may need sudo to run on port 443
    production: { ssl: true, port: 4443, hostname: "genbu.shishin.nara.jp" },
    development: { ssl: false, port: 4000, hostname: "localhost" },
  };

  const environment = process.env.NODE_ENV || "production";
  const config = configurations[environment];
  const crypt_key = process.env.CRYPT_KEY_PATH || ""
  const crypt_cert = process.env.CRYPT_CERT_PATH || ""

  let isSSL = "http";
  let host = "localhost";
  if (environment == "production") {
    isSSL = "https";
    host = "genbu.shishin.nara.jp";
  }

  const servises = [
    { name: "graph", url: isSSL + "://" + host + ":4001/graphql" },
    { name: "user", url: isSSL + "://" + host + ":4002/graphql" },
    { name: "blendGraph", url: isSSL + "://" + host + ":4003/graphql" },
  ];

  const gateway = new ApolloGateway({
    serviceList: servises,
    //サブグラフごとに一回ずつ呼ぶ
    buildService({ name, url }) {
      return new RemoteGraphQLDataSource({
        url, //サブグラフのURL
        //http-headerを付与して送信
        willSendRequest({ request, context }: any) {
          try {
            console.log(url);
            const authContext =
              context.user.headers.authorization.split("Bearer ")[1];

            //console.log(authContext)
            request.http.headers.set("authorization", authContext);
          } catch {
            console.log("headersが見つからない");
          }
        },
      });
    },
  });

  const server = new ApolloServer({
    gateway,
    //各サブグラフへ

    context: ({ req }) => {
      const user = req;
      return { user };
    },
  });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  // Create the HTTPS or HTTP server, per configuration
  let httpServer: any;
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

  await new Promise((resolve) =>
    httpServer.listen({ port: config.port }, resolve)
  );
  console.log(
    "🚀 Server ready at",
    `http${config.ssl ? "s" : ""}://${config.hostname}:${config.port}${
      server.graphqlPath
    }`
  );
  return { server, app };
}

startApolloServer();
