// app/action.ts
'use server';
import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';

let todoSkills: { id: number | null; label: string }[] = [];

export const handleSubmit = async (formData: FormData, val: { id?: number | null; label: string }) => {
    // const skills = formData.get('skills') as string;
    if (val?.id) {
        const skillIndex = todoSkills.findIndex(skill => skill.id === val?.id);

        if (skillIndex !== -1) {
            todoSkills[skillIndex].label = val?.label;

            try {
                await kv.set('skills', todoSkills);
                revalidatePath('/');
            } catch (error) {
                console.error(error);
            }
        }
    } else if (val?.label?.trim()) {
        const newSkill = { id: todoSkills.length + 1, label: val?.label };
        todoSkills.push(newSkill);

        try {
            await kv.set('skills', todoSkills);
            revalidatePath('/');
        } catch (error) {
            console.error(error);
        }
    }
    revalidatePath('/');
};

export const getSkill = async () => {
    try {
       return await kv.get('skills');
    } catch (error) {
        console.error(error);
    }
};

export const handleDelete = async (id: number) => {
    todoSkills = todoSkills.filter(skill => skill.id !== id);

    try {
        await kv.set('skills', todoSkills);
        revalidatePath('/');
    } catch (error) {
        console.error(error);
    }
};

export const handleEdit = async (id: number, newLabel: string) => {
    const skillIndex = todoSkills.findIndex(skill => skill.id === id);

    if (skillIndex !== -1) {
        todoSkills[skillIndex].label = newLabel;

        try {
            await kv.set('skills', todoSkills);
            revalidatePath('/');
        } catch (error) {
            console.error(error);
        }
    }
};