// src/app/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import words from '@/data/words';

export default function Home() {
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleStart = () => {
    const query = `ids=${selected.join(',')}`;
    router.push(`/flashcards?${query}`);
  };

  return (
    <main className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-white'>
        Japanese Vocabulary
      </h1>
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
