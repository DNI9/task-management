import React from 'react';
import { useHistory } from 'react-router';

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <button type="button" onClick={() => history.push('/login')}>
        Login
      </button>
    </div>
  );
};

export default Home;
