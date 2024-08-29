'use client';

import React from 'react';
import { Input } from "@nextui-org/input";

interface InputProps {
    handleChange?: (e: any) => void;
    value?: string
    name?: string
}

const InputFeild = (props: InputProps) => {
    const { handleChange, value ,name} = props;

    return (
        <Input
            label="Enter skill"
            size='sm'
            value={value}
            name={name}
            onChange={handleChange}
            classNames={{
                input: [
                    "bg-transparent",
                    "focus:outline-none",
                    "text-black/90 dark:text-white/90",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                    'text-left',
                    'p-2',
                    'rounded-lg',
                    "shadow-xl",
                    "bg-input-200/50",
                    "dark:bg-input/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-input-200/70",
                    "dark:hover:bg-input/70",
                    "group-data-[focus=true]:bg-input-200/50",
                    "dark:group-data-[focus=true]:bg-input/60",
                    'border',
                    'border-slate-500'

                ],
            }}
        />
    )
}

export default InputFeild