import React from "react";
import { Car } from "../page";
import Link from "next/link";
interface Props {
  headers: string[];
  cars: Car[];
}
const CarsTable = ({ headers, cars }: Props) => {
  return (
    <table className="table-auto border border-gray-600 text-gray-400">
      <thead className="">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="font-bold p-2 border-b text-center border-l border-gray-600"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {cars.map((car) => (
          <tr key={car._id} className="odd:bg-gray-900 hover:bg-stone-800 cursor-pointer">
            {Object.values(car).map((value) => (
              <td
                className="p-2 border-b border-l text-center border-gray-600"
                key={car._id}
              >
                <Link href={`${car._id}`} className="block h-full w-full">
                  {value !== null && value !== undefined
                    ? value.toString()
                    : "N/A"}
                </Link>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarsTable;
