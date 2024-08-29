"use client"

import InputFeild from '@/components/input';
import { Button } from '@nextui-org/button';
import Listing from '../listing/page';
import { useEffect, useState } from 'react';

const Forms = (props: any) => {
    const { createSkill, todos, handleDelete } = props;

    const [value, setValue] = useState<{ id?: number | null, label: string }>({ label: "" })

    useEffect(() => {
        value?.label.trim() && setValue({ id: null, label: "" })
    }, [createSkill])

    return (
        <>
            <div className='bg-bg-card w-full justify-center text-center p-5 rounded-lg'>
                <p className='pb-10'><span className="font-bold text-white text-4xl">List out your  </span><span className="font-black text-title text-5xl">  skills</span></p>
                <div className="w-full justify-center border-b pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    <h1 className="font-semibold text-white text-xl pb-4">Add Your Learned Skills</h1>
                    <form action={(e) => createSkill(e, value)} className='w-full'>
                        <div className='w-full flex justify-between gap-10'>
                            <div className='w-full'>
                                <InputFeild name='skills' value={value?.label} handleChange={(e) => setValue((prev) => ({ ...prev, label: e.target.value }))} />
                            </div>
                            <div className='w-2/6 text-right'>
                                <Button
                                    disableRipple
                                    radius="full"
                                    className="rounded-lg w-full h-full font-bold p-4 bg-gradient-to-r from-teal-600 to-blue-600"
                                    type="submit"
                                >
                                    {value?.id ? 'Update Skill' : 'Add Skill'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full h-screen-1/2 overflow-y-auto no-scrollbar">
                <div className="w-full max-h-[280px] overflow-y-scroll no-scrollbar">
                    {
                        todos?.length > 0 && todos?.map((list: { id: number, label: string }) => (
                            <Listing
                                key={list?.id}
                                id={list?.id}
                                label={list?.label}
                                handleDelete={() => handleDelete(list?.id)}
                                handleEdit={() => setValue({ id: list?.id, label: list?.label })}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Forms