import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import 'antd/dist/antd.css';
import Main from './components/Main.jsx';
function App() {

  const client = new ApolloClient({
    uri: "https://countries.trevorblades.com/",
    cache: new InMemoryCache(),
    fetchOptions: {
      mode: 'no-cors',
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      "Access-Control-Allow-Credentials" : true
    },
    body: JSON.stringify(''),
  });

  return (
    <ApolloProvider client={client}>
      <Main/>
    </ApolloProvider>
  );
}

export default App;
