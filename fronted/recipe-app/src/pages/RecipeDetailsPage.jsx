import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Image, Button } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const RecipeDetailsPage = () => {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); 
  const [userToken, setUserToken] = useState(''); 
  useEffect(() => {
    // Check if the recipe is a favorite when the component loads
    checkFavoriteStatus();

    axios
      .get(`https://ill-pink-salmon-suit.cyclic.app/users/recipes/details/${recipeId}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setRecipeDetails(response.data.recipeDetails);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [recipeId]);

  // Function to check if the recipe is a favorite
  const checkFavoriteStatus = async () => {
    try {
      const response = await axios.get('https://ill-pink-salmon-suit.cyclic.app/user-preferences', {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the user's token
        },
      });

      if (response.data.preferences) {
        const preferences = response.data.preferences;
        const isRecipeInFavorites = preferences.some((preference) => preference.recipeId === recipeId);
        setIsFavorite(isRecipeInFavorites);
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
  };


  const handleSaveAsFavorite = () => {
    
    axios.post(`https://ill-pink-salmon-suit.cyclic.app/users/recipes/favorite/${recipeId}`, null, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        console.log('Recipe saved as favorite:', response.data);
        
      })
      .catch((error) => {
        console.error('Error saving recipe as favorite:', error);
      });
  };
  

  return (
    <Box p={4}>
      <Navbar />
      <Heading as="h2" size="xl">
        Recipe Details Page
      </Heading>
      {loading ? (
        <Text>Loading...</Text>
      ) : recipeDetails ? (
        <div>
          <Image src={recipeDetails.image} />
          <Text>Recipe Name: {recipeDetails.title}</Text>
          <Text>Instructions:</Text>
          <div dangerouslySetInnerHTML={{ __html: recipeDetails.instructions }} />
          <Button
            onClick={handleSaveAsFavorite}
            colorScheme={isFavorite ? 'red' : 'teal'}
          >
            {isFavorite ? 'Remove from Favorites' : 'Save as Favorite'}
          </Button>
        </div>
      ) : (
        <Text>No data available for this recipe.</Text>
      )}
    </Box>
  );
};

export default RecipeDetailsPage;
