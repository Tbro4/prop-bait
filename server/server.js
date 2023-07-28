const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const http = require("http");
const cors = require("cors");
const { json } = require("body-parser");
const { authMiddleware } = require("./utils/auth");
const path = require("path");
const root = path.join(__dirname, "..");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();

  app.use(express.static(path.join(root, "client/build")));

  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  db.once("open", () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

startApolloServer(typeDefs, resolvers);

// Catch-all route for client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(root, "client/build", "index.html"));
});

httpServer.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}!`);
});
