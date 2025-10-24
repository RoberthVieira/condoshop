import type { ButtonProps } from "../types/ButtonProps";

export default function Button({text, onClick}: ButtonProps){
    return(
        <button 
            onClick={onClick}
            className="py-2 px-5 bg-indigo-700 text-white rounded-lg font-semibold hover:scale-105 transition"
        >
            {text}
        </button>
    )
}