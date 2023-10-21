import React, { useState } from 'react';
import { Box, Heading, Text, Input, Button, SimpleGrid, Center, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery) {
      setError('Query parameter is required');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.get(`https://ill-pink-salmon-suit.cyclic.app/users/recipes/search?query=${searchQuery}`);
      const { recipes, error } = response.data;

      if (error) {
        setError(error);
        setSearchResults([]);
      } else {
        setSearchResults(recipes);
      }
    } catch (error) {
      setError('Failed to fetch recipes');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <Navbar />
      <Heading as="h1" size="2xl">
        Welcome to the Recipe App
      </Heading>
      <Text fontSize="lg">Start searching for delicious recipes!</Text>

      <Box mt={4}>
        <Input
          type="text"
          placeholder="Search for recipes"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {loading && (
        <Center mt={4}>
          <Spinner size="lg" />
        </Center>
      )}

      {searchResults.length > 0 && (
        <SimpleGrid columns={3} spacing={4} mt={4}>
          {searchResults.map((recipe) => (
       
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default HomePage;
