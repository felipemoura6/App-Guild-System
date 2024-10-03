import { ChangeEvent } from 'react';

interface FormInputTextProps {
    type: string;
    text: string;
    name: string;
    placeholder: string;
    handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    id: string
}

export function FormInputText({ type, text, name, placeholder, handleOnChange, value }: FormInputTextProps) {
    return (
        <div className="flex flex-col mb-1">
            <label className="mb-1 font-bold sr-only" htmlFor={name}>
                {text}
            </label>
            <input
                type={type}
                className="rounded-md px-2 py-1 border border-gray-300 shadow-md w-[14rem] mr-4"
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value}
            />
        </div>
    );
}
