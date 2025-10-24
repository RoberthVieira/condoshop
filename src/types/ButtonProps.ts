import type { MouseEvent } from "react";

export interface ButtonProps{
    text: string;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    type?: string
}