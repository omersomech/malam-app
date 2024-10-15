import Link from "next/link";
import CarsTable from "./components/cars-table";
import { SearchButton } from "./components/search-button";
import { AddFilterButton } from "./components/add-filter-button";

export interface Car {
  _id: number;
  mispar_rechev: number;
  tozeret_cd: number;
  sug_degem: string;
  tozeret_nm: string;
  degem_cd: number;
  degem_nm: string;
  ramat_gimur?: string;
  ramat_eivzur_betihuty?: null;
  kvutzat_zihum?: number;
  shnat_yitzur: number;
  degem_manoa?: string;
  mivchan_acharon_dt?: Date;
  tokef_dt?: Date;
  baalut?: string;
  misgeret?: string;
  tzeva_cd?: number;
  tzeva_rechev?: string;
  zmig_kidmi?: string;
  zmig_ahori?: string;
  sug_delek_nm?: string;
  horaat_rishum: number;
  moed_aliya_lakvish: string;
  kinuy_mishari?: string;
}

type SearchParams = {
  search?: string;
  _id?: number;
  mispar_rechev?: number;
  tozeret_cd?: number;
  sug_degem?: string;
  tozeret_nm?: string;
  degem_cd?: number;
  degem_nm?: string;
  ramat_gimur?: string;
  ramat_eivzur_betihuty?: null;
  kvutzat_zihum?: number;
  shnat_yitzur: number;
  degem_manoa?: string;
  mivchan_acharon_dt?: Date;
  tokef_dt?: Date;
  baalut?: string;
  misgeret?: string;
  tzeva_cd?: number;
  tzeva_rechev?: string;
  zmig_kidmi?: string;
  zmig_ahori?: string;
  sug_delek_nm?: string;
  horaat_rishum?: number;
  moed_aliya_lakvish?: string;
  kinuy_mishari?: string;
  offset?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  let filters = {};
  let search = searchParams.search ? searchParams.search : "";
  if (!search && !searchParams.offset) {
    filters = Object.entries(searchParams).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) acc[key] = value;
      return acc;
    }, {} as Record<string, unknown>);
  }

  try {
    const response = await fetch(
      `https://data.gov.il/api/3/action/datastore_search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resource_id: "053cea08-09bc-40ec-8f7a-156f0677aff3",
          filters: { ...filters },
          q: search,
          distinct: true,
          plain: true,
          limit: 5,
          offset: searchParams.offset,
          fields: [],
          sort: "",
          include_total: true,
          records_format: "objects",
        }),
      }
    );
    const res = await response.json();
    if (!res.success) throw new Error(res.error || "Failed to fetch data");
    const cars: Car[] = res.result.records;
    const next = res.result._links.next;
    const headers = Object.keys(cars[0]);
    return (
      <div className="p-8">
        <div className="flex gap-2">
          <SearchButton />
          <AddFilterButton headers={headers} />
        </div>
        <CarsTable headers={headers} cars={cars} />
        <Link
          href={`?offset=${
            searchParams.offset ? parseInt(searchParams.offset) + 10 : 10
          }`}
        >
          Next Page
        </Link>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="p-8">
        <SearchButton />
        <div>No cars found, please try different search .</div>
      </div>
    );
  }
}
