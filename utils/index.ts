import { CarProps, HomeFilterProps } from "@/types";

export async function fetchCars(filters: HomeFilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
    const headers = {
        'X-RapidAPI-Key': '48b9637089msh0676a9f83144900p11aaf9jsn1f9d497d343a',
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;

    const response = await fetch(url, {headers: headers});
    return response.json();
}

export const updateSearchParams = (type: string, value: string) => {
    // Get the current URL search params
    const searchParams = new URLSearchParams(window.location.search);
    console.log('updateSearchParams: ', searchParams);
  
    // Set the specified search parameter to the given value
    searchParams.set(type, value);
  
    // Set the specified search parameter to the given value
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
};

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age

    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    // const url = new URL("https://cdn.imagin.studio/getimage");
    // const { make, model, year } = car;
    // const NEXT_PUBLIC_IMAGIN_API_KEY="hrjavascript-mastery"
    // console.log('NEXT_PUBLIC_IMAGIN_API_KEY: ', process.env.NEXT_PUBLIC_IMAGIN_API_KEY);
    // url.searchParams.append('customer', NEXT_PUBLIC_IMAGIN_API_KEY || '');
    // url.searchParams.append('make', make);
    // url.searchParams.append('modelFamily', model.split(" ")[0]);
    // url.searchParams.append('zoomType', 'fullscreen');
    // url.searchParams.append('modelYear', `${year}`);
    // // url.searchParams.append('zoomLevel', zoomLevel);
    // url.searchParams.append('angle', `${angle}`);
    const url=""
    return `${url}`;
};