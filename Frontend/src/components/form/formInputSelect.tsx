import { ChangeEvent } from 'react';

interface FormSelectTextProps {
    text: string;
    name: string;
    options: string[];
    handleOnChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    id: string
}

export function FormSelectText({ text, name, options, handleOnChange, id, value }: FormSelectTextProps) {
    return (
        <div className="flex flex-col mb-1">
            <label className="mb-1 font-bold sr-only" htmlFor={name}>
                {text}
            </label>
            <select
                name={name}
                id={id}
                className="rounded-md px-2 py-1 border border-gray-300 shadow-md"
                onChange={handleOnChange}
                value={value}
            >
                <option disabled>Choose your class/spec{text}</option>
                {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
                ))}
             </select>
        </div>
    );
}
