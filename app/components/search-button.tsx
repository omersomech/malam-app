"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useRef } from "react";

export const SearchButton = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleInputChange = useCallback(() => {
    setTimeout(() => {
      if (inputRef.current) {
        router.push(`?search=${inputRef.current.value}`);
      }
    }, 200);
  }, [router]);

  return (
    <div className="pb-2">
      <input
        ref={inputRef}
        placeholder="Search"
        className="p-2.5 text-gray-500 bg-gray-300 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        type="text"
        onChange={handleInputChange}
      />
    </div>
  );
};
