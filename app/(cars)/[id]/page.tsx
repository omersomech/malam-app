import { Car } from "@/app/page";
import React from "react";

const CarPage = async ({ params }: { params: { id: string } }) => {
  try {
    const getCar = await fetch(
      "https://data.gov.il/api/3/action/datastore_search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resource_id: "053cea08-09bc-40ec-8f7a-156f0677aff3",
          filters: { _id: `${params.id}` },
          q: "",
          distinct: true,
          plain: true,
          limit: 10,
          offset: 0,
          fields: [],
          sort: "",
          include_total: true,
          records_format: "objects",
        }),
      }
    );

    if (!getCar.ok) {
      throw new Error("Failed to fetch car data");
    }

    const res = await getCar.json();
    const car: Car = res.result.records[0];

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(car).map(([name, value]) => (
            <tr key={name}>
              <td>{name}:</td>
              <td>
                {value !== null && value !== undefined
                  ? value.toString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading car data</div>;
  }
};

export default CarPage;
