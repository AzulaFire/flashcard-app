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

  useEffect(() => {
    if (!idsParam) return;
    const idArray = idsParam.split(',').map((id) => parseInt(id));
    const filtered = words.filter((w) => idArray.includes(w.id));
    setSelectedWords(filtered);
  }, [idsParam]);

  const nextCard = () => {
    setShowBack(false);
    setIndex((prev) => (prev + 1) % selectedWords.length);
  };

  const goBack = () => {
    router.push('/');
  };

  if (selectedWords.length === 0) return <p className='p-4'>Loading...</p>;

  const current = selectedWords[index];

  return (
    <main className='min-h-screen flex flex-col items-center justify-center p-4'>
      <h1 className='text-4xl font-semibold mb-4 text-white'>Flashcards</h1>
      <div onClick={() => setShowBack(!showBack)} className='cursor-pointer'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={showBack ? 'back' : 'front'}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='w-[400px] h-64 rounded-xl bg-white shadow-lg flex items-center justify-center text-4xl font-bold text-center p-4'
          >
            {showBack ? (
              current.meaning
            ) : (
              <div className='flex flex-col items-center'>
                <span>{current.word}</span>
                <span className='text-gray-500 text-lg'>
                  {current.hiragana}
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className='mt-6 flex gap-4'>
        <button
          onClick={nextCard}
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer'
        >
          Next
        </button>
        <button
          onClick={goBack}
          className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer'
        >
          Back to Word List
        </button>
      </div>
    </main>
  );
}
