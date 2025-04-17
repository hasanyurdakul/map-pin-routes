'use client';
import styles from './page.module.css';
import { Button, HStack } from '@chakra-ui/react';

export default function Home() {
  return (
    <div className={styles.page}>
      <HStack>
        <Button
          onClick={() => {
            console.log('Hello');
          }}
        >
          Click me
        </Button>
        <Button>Click me</Button>
      </HStack>
    </div>
  );
}
