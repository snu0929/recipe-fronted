import React from 'react';
import { Box, Image, Heading, Text, Button, Link } from '@chakra-ui/react';

const RecipeCard = ({ recipe }) => {
  return (
    <Box borderWidth="1px" borderRadius="md" overflow="hidden">
      <Image src={recipe.image} alt={recipe.title} />
      <Box p={4}>
        <Heading as="h3" size="md">
          {recipe.title}
        </Heading>
        <Text mt={2} fontSize="sm">
          {recipe.summary}
        </Text>
        <Button colorScheme="teal" mt={2} as={Link} href={`/details/${recipe.id}`}>
          View Details
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeCard;
