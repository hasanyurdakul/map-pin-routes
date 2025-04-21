import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { BsTrash2 } from 'react-icons/bs';
import { LuMapPin } from 'react-icons/lu';
import { MarkedLocation } from '@/types/form';

interface LocationListItemProps {
  location: MarkedLocation;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const LocationListItem = ({ location, onEdit, onDelete }: LocationListItemProps) => {
  return (
    <Flex p={4} borderRadius="lg" alignItems="center" gap={4} border={'1px solid #E2E8F0'}>
      <div>
        <LuMapPin color={location.color} />
      </div>
      <Box flex={1}>
        <Text fontWeight="bold">{location.name}</Text>
        <Text fontSize="sm" color="gray.600">
          Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}
        </Text>
      </Box>
      <IconButton
        onClick={() => onEdit(location.id)}
        colorPalette="blue"
        variant="ghost"
        aria-label="Edit location"
      >
        <FiEdit size={20} />
      </IconButton>
      <IconButton
        onClick={() => onDelete(location.id)}
        colorPalette="red"
        variant="ghost"
        aria-label="Delete location"
      >
        <BsTrash2 size={20} />
      </IconButton>
    </Flex>
  );
};
