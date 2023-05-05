"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
export default function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  function handlerSearch() {
    if (searchRef.current?.value) {
      router.push(`/search?q=${searchRef.current.value}`);
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
        className="border-none outline-none px-6 py-3 rounded"
      />
      <button
        className="px-6 py-3 bg-blue-400 hover:bg-blue-500 active:bg-blue-400 rounded-lg text-white"
        onClick={handlerSearch}
      >
        Search
      </button>
    </form>
  );
}
