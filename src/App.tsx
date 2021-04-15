import { Box, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/auth';
import { TaskProvider } from './context/tasks';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default function App() {
  const bg = useColorModeValue(
    'linear(to-bl, white.200, white.400)',
    'linear(to-bl, #262528, #201F21)'
  );

  return (
    <AuthProvider>
      <TaskProvider>
        <Box bgGradient={bg} width="100%" minHeight="100vh">
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Router>
        </Box>
      </TaskProvider>
    </AuthProvider>
  );
}
