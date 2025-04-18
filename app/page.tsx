'use client';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { Button, HStack } from '@chakra-ui/react';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <HStack>
        <Button
          onClick={() => {
            router.push('/add');
          }}
        >
          Go To Demo
        </Button>
      </HStack>
    </div>
  );
}
