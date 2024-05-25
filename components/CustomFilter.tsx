"use client"

import { Fragment, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { CustomFilterProps } from "@/types";
import { updateSearchParams } from "@/utils";

export default function CustomFilter({ title, options, setFilter }: CustomFilterProps) {
    const router = useRouter();
    const [selected, setSelected] = useState(options[0]); // State for storing the selected option

    return (
        <div className='w-fit'>
            <Listbox
                value={selected}
                onChange={(e) => {
                    // Update the selected option in state
                    setSelected(e);
                    // Update the URL search parameters and navigate to the new URL
                    setFilter(e.value);
                }}
            >
                <div className='relative w-fit z-10'>
                    {/* Button for the listbox */}
                    <ListboxButton className='custom-filter__btn'>
                        <span className='block truncate'>{selected.title}</span>
                        <Image 
                            src='/chevron-up-down.svg' 
                            width={20} height={20} 
                            className='ml-4 object-contain' 
                            alt='chevron_up-down' 
                        />
                    </ListboxButton>

                    {/* Transition for displaying the options */}
                    <Transition 
                        // group multiple elements without introducing an additional DOM node i.e., <></>
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <ListboxOptions className='custom-filter__options'>
                            {/* Map over the options and display them as listbox options */}
                            {options.map((option) => (
                                <ListboxOption key={option.title}
                                    value={option}
                                    className={({ focus }) => 
                                        `relative cursor-default select-none py-2 px-4 ${
                                        focus ? "bg-primary-blue text-white" : "text-gray-900"
                                    }`}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span 
                                                className={
                                                    `block truncate 
                                                    ${selected ? "font-medium" : "font-normal"  }`
                                                } 
                                            >
                                                {option.title}
                                            </span>
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}