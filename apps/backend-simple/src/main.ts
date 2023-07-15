import Fastify from 'fastify';
import cors from "@fastify/cors";
import formDataPlugin from "@fastify/formbody";
import { app } from './app/app';
import { plugin } from "supertokens-node/framework/fastify";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";

supertokens.init({
  framework: "fastify",
  supertokens: {
    connectionURI: "http://localhost:3567",
    // apiKey: <API_KEY(if configured)>,
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/session/appinfo
    appName: 'supertokens-poc',
    apiDomain: 'http://localhost:4030',
    websiteDomain: 'http://localhost:3030',
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    EmailPassword.init(),
    Session.init(),
    Dashboard.init(),
  ]
});

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4030;

const server = Fastify({
  logger: true,
});

server.register(cors, {
  origin: "http://localhost:3030",
  allowedHeaders: ['Content-Type', ...supertokens.getAllCORSHeaders()],
  credentials: true,
});

server.register(formDataPlugin);
server.register(plugin);

server.register(app);

server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
