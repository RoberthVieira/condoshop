import type { InputHTMLAttributes } from "react"

export default function Input(props: InputHTMLAttributes<HTMLInputElement>){
    return (
        <input 
            {...props}
            className={`p-2 rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-indigo-500 ${props.className || ""}`}
        />
    )
}