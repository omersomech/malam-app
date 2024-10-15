"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
interface Props {
  headers: string[];
}
export const AddFilterButton = ({ headers }: Props) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex gap-2 pb-2">
      <select className="w-full p-2.5 text-gray-500 bg-gray-300 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
        <option>Add Filter</option>
        {headers.map((header) => (
          <option
            onClick={() => {
              setFilters((prev) => [...prev, header]);
            }}
            key={header}
          >
            {header}
          </option>
        ))}
      </select>
      {filters.length > 0 &&
        filters.map((filter) => (
          <div
            key={filter}
            className="w-full p-1 text-gray-500 bg-gray-300 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
          >
            <div className="">{filter}</div>
            <div className="flex gap-x-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="Enter value to filter"
                className="rounded-md pl-1"
                onChange={(e) => setFilterValue(e.target.value)}
              />
              <Link
                className="border border-gray-700 rounded-md px-0.5 "
                href={
                  pathname +
                  "?" +
                  createQueryString(filter, inputRef.current?.value!)
                }
              >
                Search
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};
