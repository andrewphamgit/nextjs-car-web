"use client"

import { useEffect, useState } from "react";

import { fetchCars } from "@/utils";
import { Hero, SearchBar, CustomFilter, ShowMore, CarCard } from "@/components";
import { fuels, yearsOfProduction } from "@/constants";
import Image from "next/image";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [cars, setCars]: any[] = useState([]);

    // search states
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");

    // filte states
    const [fuel, setFuel] = useState("");
    const [year, setYear] = useState(2022);

    // pagination states
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        getDataCars();
    }, [fuel, year, limit, manufacturer, model]);

    async function getDataCars() {
        try {
            const result = await fetchCars({
                manufacturer: manufacturer || "",
                year: year || 2022,
                fuel: fuel || "",
                limit: limit || 10,
                model: model || "",
            });
            setCars(result);
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="overflow-hidden">
            <Hero />

            <div id='discover' className='mt-12 padding-x padding-y max-width'>
                <div className='home__text-container'>
                    <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
                    <p>Explore out cars you might like</p>
                </div>

                <div className='home__filters'>
                    <SearchBar 
                        setSearchBarForm={(searchManufacturer: string, searchModel: string) => {
                            setManufacturer(searchManufacturer);
                            setModel(searchModel);
                        }}
                    />

                    <div className='home__filter-container'>
                        <CustomFilter 
                            title='fuel' 
                            options={fuels} 
                            setFilter={setFuel}
                        />
                        <CustomFilter 
                            title='year'
                            options={yearsOfProduction} 
                            setFilter={setYear}
                        />
                    </div>
                </div>

                { cars.length > 0 ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {cars.map((car: any) => (
                                <CarCard car={car} />
                            ))}
                        </div>

                        {loading && (
                            <div className="mt-16 w-full flex-center">
                                <Image 
                                    src={"/loader.svg"}
                                    alt="loader"
                                    width={50} height={50}
                                    className="object-contain"
                                />
                            </div>
                        )}

                        <ShowMore
                            pageNumber={limit / 10}
                            isNext={limit > cars.length}
                            setLimit={setLimit}
                        />
                    </section>
                ) : (
                    <div className='home__error-container'>
                        <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
                        <p>{cars?.message}</p>
                    </div>
                )}
            </div>
        </main>
    );
}
