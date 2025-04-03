import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";


const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials:"include"
});



export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
// const client = new ApolloClient({
//   uri: "http://localhost:4000/graphql",
//   cache: new InMemoryCache(),
// });

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
