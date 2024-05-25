import { MouseEventHandler } from "react";

export interface CustomButtonPorps {
    title: string;
    containerStyles?: string;
    btnType?: "submit" | "reset" | "button" | undefined;
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}