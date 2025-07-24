'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import words from '@/data/words';

export default function Home() {
  const [selected, setSelected] = useState([]);
  const [autoStart, setAutoStart] = useState(false); // NEW
  const router = useRouter();

  const handleStart = () => {
    const query = `ids=${selected.join(',')}`;
    router.push(`/flashcards?${query}`);
  };

  useEffect(() => {
    if (autoStart && selected.length > 0) {
      handleStart();
      setAutoStart(false); // reset flag
    }
  }, [selected, autoStart]);

  const handleSelectAll = () => {
    const allIds = words.map((word) => word.id);
    setSelected(allIds);
    setAutoStart(true); // trigger navigation after state update
  };

  const handleSelectRandom10 = () => {
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    const random10 = shuffled.slice(0, 10).map((word) => word.id);
    setSelected(random10);
    setAutoStart(true); // trigger navigation after state update
  };

  const toggleSelect = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleClearAll = () => {
    setSelected([]);
  };

  return (
    <main className='px-4 py-6 max-w-4xl mx-auto w-full'>
      <h1 className='text-3xl font-bold mb-6 text-white'>
        Japanese Vocabulary
      </h1>

      <div className='mb-4 flex flex-wrap gap-4 items-center'>
        <button
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
          onClick={handleSelectAll}
        >
          Select All
        </button>
        <button
          className='px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700'
          onClick={handleSelectRandom10}
        >
          Select Random 10
        </button>
        <button
          className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
          onClick={handleClearAll}
        >
          Clear All
        </button>
        <span className='text-white font-semibold'>
          Selected: {selected.length}
        </span>
      </div>

      <table className='w-full text-left border border-gray-300 bg-white'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='p-2'>Select</th>
            <th className='p-2'>Word</th>
            <th className='p-2'>Hiragana</th>
            <th className='p-2'>Meaning</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id} className='border-t'>
              <td className='p-2'>
                <input
                  type='checkbox'
                  checked={selected.includes(word.id)}
                  onChange={() => toggleSelect(word.id)}
                  className='cursor-pointer'
                />
              </td>
              <td className='p-2'>{word.word}</td>
              <td className='p-2'>{word.hiragana}</td>
              <td className='p-2'>{word.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer'
        onClick={handleStart}
        disabled={selected.length === 0}
      >
        Start Flashcards
      </button>
    </main>
  );
}
