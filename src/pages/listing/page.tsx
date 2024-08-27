"use client"

import { Button } from '@nextui-org/button'
import React from 'react'

interface ListProps {
    id: number;
    label: string;
    handleEdit:()=>void;
    handleDelete:()=>void;
}

const Listing = (props: ListProps) => {
    const { id, label ,handleEdit ,handleDelete} = props;
    return (
        <div className='w-full flex justify-between text-center gap-12'>
            <div className='w-full bg-bg-card rounded-lg self-center p-3 pl-6 pr-6 text-left'>
                <h3>{label}</h3>
            </div>
            <div className='w-2/6 text-right flex justify-between gap-6'>
                <Button onClick={handleEdit} disableRipple radius="full" className=" rounded-lg w-1/2 h-full p-3 bg-gradient-to-r from-purple-400 to-purple-800">
                    Edit
                </Button>
                <Button onClick={handleDelete} disableRipple radius="full" className=" rounded-lg w-1/2 h-full p-3 bg-gradient-to-r from-rose-400 to-rose-800">
                    Delete
                </Button>
            </div>
        </div>
    )
}

export default Listing