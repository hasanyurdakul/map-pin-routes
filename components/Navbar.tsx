'use client';
import {
  Stack,
  Container,
  Box,
  Button,
  useBreakpointValue,
  Dialog,
  Portal,
  Icon,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { RiMenu3Line } from 'react-icons/ri';

const navigation = [
  { name: 'Add Location', href: '/add' },
  { name: 'Location List', href: '/list' },
  { name: 'Route Display', href: '/route' },
];

const Navbar = () => {
  const pathname = usePathname();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const NavLinks = ({ inDrawer = false }) => (
    <Stack
      as="nav"
      direction={inDrawer ? 'column' : 'row'}
      gap={inDrawer ? 6 : 4}
      w="100%"
      align={inDrawer ? 'flex-start' : 'center'}
    >
      {navigation.map(item => (
        <Link key={item.href} href={item.href} passHref>
          <Text
            w={inDrawer ? '100%' : 'auto'}
            p={inDrawer ? 2 : 0}
            fontWeight={pathname === item.href ? 'bold' : 'normal'}
            color={pathname === item.href ? 'blue.500' : 'gray.600'}
            _hover={{ color: 'blue.500' }}
            fontSize={inDrawer ? 'lg' : 'md'}
          >
            {item.name}
          </Text>
        </Link>
      ))}
    </Stack>
  );

  return (
    <Container maxW="6xl" py={4}>
      {isMobile ? (
        <Box display="flex" justifyContent="flex-end" borderBottom="1px solid #1100ff" pb={4}>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button variant="ghost">
                Navigation <Icon as={RiMenu3Line} ml={2} boxSize={5} />
              </Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title p={2}>Navigation</Dialog.Title>
                    <Dialog.CloseTrigger asChild>
                      <Button variant="ghost" position="absolute" right={3} top={3}>
                        <IoIosClose size={20} />
                      </Button>
                    </Dialog.CloseTrigger>
                  </Dialog.Header>
                  <Dialog.Body pt={6}>
                    <NavLinks inDrawer />
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </Box>
      ) : (
        <Stack
          as="nav"
          direction="row"
          gap={6}
          borderBottom="1px solid #1100ff"
          pb={4}
          align="center"
        >
          <NavLinks />
        </Stack>
      )}
    </Container>
  );
};

export default Navbar;
