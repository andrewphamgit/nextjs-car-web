interface OptionProps {
    title: string;
    value: string;
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
    setFilter: (data: any) => any;
}