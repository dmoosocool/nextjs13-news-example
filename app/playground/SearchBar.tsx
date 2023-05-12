'use client';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
export default function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  function handlerSearch() {
    if (searchRef.current?.value) {
      router.push(`/playground/search/${searchRef.current.value}`);
    }
  }
  return (
    <form
      className="flex flex-row items-center justify-center gap-x-4"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={searchRef}
        type="text"
        placeholder="search something.."
        className="rounded border-none px-6 py-3 outline-none"
      />
      <button
        className="rounded-lg bg-blue-400 px-6 py-3 text-white hover:bg-blue-500 active:bg-blue-400"
        onClick={handlerSearch}
      >
        Search
      </button>
    </form>
  );
}
