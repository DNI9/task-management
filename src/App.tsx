import { Box, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { QueryClient, QueryClientProvider, QueryKey } from 'react-query';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const defaultQueryFn = async ({ queryKey }: { queryKey: QueryKey }) => {
  const { data } = await axios.get(`${queryKey[0]}`, {
    headers: { Authorization: `Bearer ${localStorage.accessToken}` },
  });
  return data;
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { queryFn: defaultQueryFn } },
});

export default function App() {
  const bg = useColorModeValue(
    'linear(to-bl, white.200, white.400)',
    'linear(to-bl, #262528, #201F21)'
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Box bgGradient={bg} width="100%" minHeight="100vh">
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>
        </AuthProvider>
      </Box>
    </QueryClientProvider>
  );
}
