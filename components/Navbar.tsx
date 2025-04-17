'use client';
import { Stack, Link as ChakraLink, Container } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navigation = [
  { name: 'Add Location', href: '/add' },
  { name: 'Location List', href: '/list' },
  { name: 'Route Display', href: '/route' },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <>
      <Container maxW="4xl" py={4}>
        <Stack as="nav" direction="row" gap={6}>
          {navigation.map(item => (
            <Link key={item.href} href={item.href} passHref>
              <ChakraLink
                fontWeight={pathname === item.href ? 'bold' : 'normal'}
                color={pathname === item.href ? 'blue.500' : 'gray.600'}
                _hover={{ color: 'blue.500' }}
              >
                {item.name}
              </ChakraLink>
            </Link>
          ))}
        </Stack>
      </Container>
    </>
  );
};

export default Navbar;
