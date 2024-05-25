"use client";

import { Fragment, useState } from 'react';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import Image from 'next/image';

import { SearchManufacturerProps } from '@/types';
import { manufacturers } from '@/constants';

const SearchManufacturer = ({
    manufacturer, 
    setManufacturer
}: SearchManufacturerProps) => {
    const [query, setQuery] = useState("");

    const filteredManufacturers = getFilteredManufacturers();

    function getFilteredManufacturers(): string[] {
        if ("" === query) {
            return manufacturers;
        }
        let tempQuery = query.toLowerCase().replace(/\s+/g, "");
        return manufacturers.filter((item) => 
            item.toLowerCase()
            .replace(/\s+/g, "")
            .includes(tempQuery)
        );
    }

    return (
        <div className="search-manufacturer">
            <Combobox value={manufacturer} onChange={setManufacturer}>
                <div className="relative w-full">
                    {/* Button for the combobox. Click on the icon to see the complete dropdown */}
                    <ComboboxButton className={"absolute top-[14px]"}>
                        <Image 
                            src='/car-logo.svg'
                            width={20}
                            height={20}
                            className='ml-4'
                            alt='car logo'
                        />
                    </ComboboxButton>

                    {/* Input field for searching */}
                    <ComboboxInput 
                        className='search-manufacturer__input'
                        displayValue={(item: string) => item}
                        // Update the search query when the input changes
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Volkswagen...'
                    />

                    {/* Transition for displaying the options */}
                    <Transition 
                        // group multiple elements without introducing an additional DOM node i.e., <></>
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        // Reset the search query after the transition completes
                        afterLeave={() => setQuery("")}
                    >
                        <ComboboxOptions
                            className='search-manufacturer__options'
                            anchor={"bottom"}
                        >
                            {filteredManufacturers.length === 0 && query !== "" ? (
                                <ComboboxOption 
                                    value={query} 
                                    className={"search-manufacturer__option"}
                                >
                                    Create "{query}"
                                </ComboboxOption>
                            ) : (
                                filteredManufacturers.map((item) => {
                                    return (
                                        <ComboboxOption key={item}
                                            value={item}
                                            className={({focus}) => 
                                                `relative search-manufacturer__option 
                                                ${focus ? "bg-primary-blue text-white" : "text-gray-900"}
                                            `}
                                        >
                                            {({focus, selected}) => (
                                                <>
                                                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                        {item}
                                                    </span>
                            
                                                    {/* Show an active blue background color if the option is selected */}
                                                    {selected ? (
                                                        <span 
                                                            className={
                                                                `absolute inset-y-0 left-0 flex items-center pl-3 
                                                                ${focus ? "text-white" : "text-pribg-primary-purple"}`
                                                            }
                                                        />
                                                        ) : null
                                                    }
                                                </>
                                            )}
                                        </ComboboxOption>
                                    )
                                })
                            )}
                        </ComboboxOptions>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchManufacturer;