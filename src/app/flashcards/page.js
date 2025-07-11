// src/app/flashcards/page.js
import { Suspense } from 'react';
import Flashcards from '../components/Flashcards';

export default function FlashcardsPage() {
  return (
    <Suspense fallback={<p className='p-4'>Loading flashcards...</p>}>
      <Flashcards />
    </Suspense>
  );
}
