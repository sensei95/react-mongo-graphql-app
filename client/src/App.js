import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ClientIndex from "./pages/clients/Index.jsx";
import ClientShow from "./pages/clients/Show.jsx";
import ProjectIndex from "./pages/projects/Index.jsx";
import ProjectShow from "./pages/projects/Show.jsx";
import Home from "./pages/Home";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clients" element={<ClientIndex />} />
              <Route path="/clients/:id" element={<ClientShow />} />
              <Route path="/projects" element={<ProjectIndex />} />
              <Route path="/projects/:id" element={<ProjectShow />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
