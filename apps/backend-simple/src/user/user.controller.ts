import Fastify from "fastify";
import { verifySession } from "supertokens-node/recipe/session/framework/fastify";
import { SessionRequest } from "supertokens-node/framework/fastify";

let fastify = Fastify();

async function userController(fastify, options) {
  fastify.get("/any", {
    preHandler: verifySession(),
  }, (req: SessionRequest, res) => {
    res.send("You're authenticated!");
  });
}

module.exports = userController;
