import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/system";
import AppContainer from "./components/AppContainer/AppContainer";

// Construct our main GraphQL API endpoint
// Function to get the GraphQL endpoint URI based on the environment
const getGraphQLEndpoint = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://calm-dawn-80232-682649ddc0c6.herokuapp.com/graphql";
  } else {
    return "/graphql"; // Use the local endpoint for development
  }
};

const httpLink = createHttpLink({
  uri: getGraphQLEndpoint(),
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<AppContainer />} />
          </Routes>
        </Container>
      </Router>
    </ApolloProvider>
  );
}

export default App;
