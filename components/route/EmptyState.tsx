import { Box, Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const RouteEmptyState = () => {
  const router = useRouter();

  const handleAddLocation = useCallback(() => {
    router.push('/add');
  }, [router]);

  return (
    <Box textAlign="center" mt={4} p={4} bg="blue.50" color="blue.600" borderRadius="md">
      <Text mb={4}>No locations added yet. Add some locations to see the route.</Text>
      <Button colorPalette="blue" onClick={handleAddLocation}>
        Add Location
      </Button>
    </Box>
  );
};
