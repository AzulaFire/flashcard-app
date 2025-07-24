// src/components/Flashcards.js
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import words from '@/data/words';

export default function Flashcards() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids');
  const router = useRouter();
  const [selectedWords, setSelectedWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [loop, setLoop] = useState(true);

  useEffect(() => {
    if (!idsParam) return;
    const idArray = idsParam.split(',').map((id) => parseInt(id));
    const filtered = words.filter((w) => idArray.includes(w.id));

    if (shuffle) {
      const shuffled = [...filtered].sort(() => Math.random() - 0.5);
      setSelectedWords(shuffled);
    } else {
      setSelectedWords(filtered);
    }

    setIndex(0);
    setShowBack(false);
  }, [idsParam, shuffle]);

  const current = selectedWords[index];
  if (!current) return <p className='p-4 text-white'>Loading flashcards...</p>;

  const nextCard = () => {
    setShowBack(false);
    if (index < selectedWords.length - 1) {
      setIndex(index + 1);
    } else if (loop) {
      setIndex(0);
    }
  };

  const prevCard = () => {
    setShowBack(false);
    if (index > 0) {
      setIndex(index - 1);
    } else if (loop) {
      setIndex(selectedWords.length - 1);
    }
  };

  const goBack = () => {
    router.push('/');
  };

  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
      <h1 className='text-4xl font-semibold mb-2'>Flashcards</h1>
      <div className='mb-4 text-sm text-gray-300'>
        Card {index + 1} of {selectedWords.length}
      </div>

      <div
        onClick={() => setShowBack(!showBack)}
        className='cursor-pointer select-none'
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={showBack ? 'back' : 'front'}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='w-[400px] h-64 rounded-xl bg-white shadow-lg flex items-center justify-center text-4xl font-bold text-center p-4 text-black'
          >
            {showBack ? (
              <div className='flex flex-col items-center'>
                {current.meaning}
                <span className='text-gray-500 text-lg'>
                  {current.hiragana}
                </span>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <span className='text-6xl'>{current.word}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className='mt-6 flex gap-4 flex-wrap justify-center'>
        <button
          onClick={prevCard}
          className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        >
          Next
        </button>
        <button
          onClick={goBack}
          className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
        >
          Back to Word List
        </button>
      </div>

      <div className='mt-4 flex gap-4 flex-wrap justify-center'>
        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
            className='accent-purple-600'
          />
          Shuffle Cards
        </label>

        <label className='flex items-center gap-2'>
          <input
            type='checkbox'
            checked={loop}
            onChange={(e) => setLoop(e.target.checked)}
            className='accent-purple-600'
          />
          Loop Mode
        </label>
      </div>
    </main>
  );
}
