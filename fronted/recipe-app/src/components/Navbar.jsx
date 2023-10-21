import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Flex } from '@chakra-ui/react';
import Signup from './Signup';
import Login from './Login';

const Navbar = () => {
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  const toggleSignupModal = () => {
    setSignupOpen(!isSignupOpen);
  };

  const toggleLoginModal = () => {
    setLoginOpen(!isLoginOpen);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Link to="/">Home</Link>
          <Link to="/saved-recipes">Saved Recipes</Link>
        </Box>
        <Box>
          {user ? (
            <div>
              <p>Welcome, {user.name}</p>
              <Button colorScheme="teal" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div>
              <Button colorScheme="teal" onClick={toggleLoginModal}>
                Login
              </Button>
              <Button colorScheme="teal" onClick={toggleSignupModal}>
                Sign Up
              </Button>
            </div>
          )}
        </Box>
      </Flex>

      <Signup isOpen={isSignupOpen} onClose={toggleSignupModal} />
      <Login isOpen={isLoginOpen} onClose={toggleLoginModal} onLogin={handleLogin} />
    </Box>
  );
};

export default Navbar;
