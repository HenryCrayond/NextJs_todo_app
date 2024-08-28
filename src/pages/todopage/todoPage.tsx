"use client"

import React, { useState } from 'react'
import InputFeild from '@/components/input';
import { Button } from "@nextui-org/button";
import Listing from '../listing/page';
import { createSkills, deleteSkills, getTodos, updateSkills } from '@/action/action';

const TodoPage = () => {
  const [newSkill, setNewSkill] = useState<{ id?: number | null, label: string }>({ label: '' });
  const [todos, setTodos] = useState<{ id: number, label: string }[]>([]);

  const handleAddTodo = async () => {
    if (newSkill?.id) {
      const updates = await updateSkills(newSkill)
      setTodos(updates as any)
      setNewSkill({ id: null, label: '' });
    } else if(newSkill?.label?.trim()) {
      const newTodoItem = await createSkills(newSkill?.label);
      setTodos([...todos, newTodoItem]);
      setNewSkill({ label: '' });
    }
  };

  const handleEditTodo = async (id: number) => {
    const findVal = todos?.find((list) => list?.id === id)
    setNewSkill({ id: id, label: findVal?.label as string })
  }

  const handleDeleteTodo = async (id: number) => {
    const deleteItem: any = await deleteSkills(id)
    setNewSkill(deleteItem)
    setNewSkill({ label: '' });
  }

  const fetchTodoslist = async () => {
    const res = await getTodos()
    setTodos(res as any);
  };
  fetchTodoslist();

  return (
    <>
      <div className='bg-bg-card w-full justify-center text-center p-5 rounded-lg'>
        <p className='pb-10'><span className="font-bold text-white text-4xl">List out your  </span><span className="font-black text-title text-5xl">  skills</span></p>
        <div className="w-full justify-center border-b pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <h1 className="font-semibold text-white text-xl pb-4">Add Your Learned Skills</h1>
          <div className='w-full flex justify-between gap-10'>
            <div className='w-full'>
              <InputFeild value={newSkill?.label} handleChange={(e) => setNewSkill((prev) => ({ ...prev, label: e?.target?.value }))} />
            </div>
            <div className='w-2/6 text-right'>
              <Button onClick={handleAddTodo} disableRipple radius="full" className=" rounded-lg w-full h-full font-bold p-4 bg-gradient-to-r from-teal-600 to-blue-600">
                {newSkill?.id ? 'Update Skill' : "Add Skill"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen-1/2 overflow-y-auto no-scrollbar">
        <div className="w-full max-h-[280px] overflow-y-scroll no-scrollbar">
          {
            todos?.length > 0 && todos?.map((list) => (
              <Listing
                key={list?.id}
                id={list?.id}
                label={list?.label}
                handleDelete={() => handleDeleteTodo(list?.id)}
                handleEdit={() => handleEditTodo(list?.id)}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default TodoPage