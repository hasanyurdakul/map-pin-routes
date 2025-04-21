import { Box, Button, Text } from '@chakra-ui/react';

interface EmptyStateProps {
  onAddClick: () => void;
}

export const EmptyState = ({ onAddClick }: EmptyStateProps) => {
  return (
    <Box textAlign="center" py={8}>
      <Text color="gray.500">No locations added yet.</Text>
      <Button mt={4} colorPalette="blue" onClick={onAddClick}>
        Add Location
      </Button>
    </Box>
  );
};
