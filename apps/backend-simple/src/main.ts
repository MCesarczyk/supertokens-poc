import Fastify from 'fastify';
import cors from "@fastify/cors";
import formDataPlugin from "@fastify/formbody";
import { app } from './app/app';
import { plugin } from "supertokens-node/framework/fastify";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Dashboard from "supertokens-node/recipe/dashboard";
import UserRoles from "supertokens-node/recipe/userroles";

async function createRole(userId: string) {
  /** 
  * You can choose to give multiple or no permissions when creating a role
  * createNewRoleOrAddPermissions("user", []) - No permissions
  * createNewRoleOrAddPermissions("user", ["read", "write"]) - Multiple permissions
  */
  const response = await UserRoles.createNewRoleOrAddPermissions(userId, ["read"]);
  console.log(userId, response);
  

  if (response.createdNewRole === false) {
    console.log("Role 'user' already exists");
  }
}

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
    EmailPassword.init({
      override: {
        apis: (originalImplementation) => {
          return {
            ...originalImplementation,
            signUpPOST: async function (input) {

              if (originalImplementation.signUpPOST === undefined) {
                throw Error("Should never come here");
              }

              // First we call the original implementation of signUpPOST.
              let response = await originalImplementation.signUpPOST(input);

              // Post sign up response, we check if it was successful
              if (response.status === "OK") {
                let { id, email } = response.user;

                // // These are the input form fields values that the user used while signing up
                let formFields = input.formFields;
                // TODO: post sign up logic
                createRole(id);
              }
              return response;
            },

            signInPOST: async function (input) {

              if (originalImplementation.signInPOST === undefined) {
                  throw Error("Should never come here");
              }

              // First we call the original implementation of signInPOST.
              let response = await originalImplementation.signInPOST(input);

              // Post sign up response, we check if it was successful
              if (response.status === "OK") {
                  let { id, email } = response.user;

                  // These are the input form fields values that the user used while signing in
                  let formFields = input.formFields
                  // TODO: post sign in logic
                  createRole(id);
              }
              return response;
          }
          }
        }
      }
    }),
    Session.init({
      exposeAccessTokenToFrontendInCookieBasedAuth: true,
    }),
    Dashboard.init(),
    UserRoles.init({
      // skipAddingRolesToAccessToken: true,
      // skipAddingPermissionsToAccessToken: true,
    }),
  ]
});

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 4030;

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: "http://localhost:3030",
  allowedHeaders: ['Content-Type', ...supertokens.getAllCORSHeaders()],
  credentials: true,
});

fastify.register(formDataPlugin);
fastify.register(plugin);

fastify.register(app);

fastify.listen({ port, host }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
