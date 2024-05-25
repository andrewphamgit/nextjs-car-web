export interface ShowMoreProps {
    pageNumber: number;
    isNext: boolean;
    setLimit: (newLimit: number) => any;
}