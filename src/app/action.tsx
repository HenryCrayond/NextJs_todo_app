'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';

import { openai } from '@ai-sdk/openai';
import { generateId } from 'ai';
import { createAI, getMutableAIState, streamUI } from 'ai/rsc';
import { z } from 'zod';
import React from 'react';

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

// let's start ai infractions

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: React.ReactNode;
}


export const continueConversation = async (input: string): Promise<ClientMessage> => {
  'use server';
  const history = getMutableAIState();

  const result = await streamUI({
    model: openai('gpt-3.5-turbo'),
    messages: [
      ...history.get(),
      { role: 'system', content: 'You are a friendly bot!' },
      { role: 'user', content: input }],
    system: 'You are a helpful assistant.',
    text: ({ done, content }) => {
      if (done) {
        history.done((message: ServerMessage[]) => [...message, { role: "user", content }])
      }
      return <div>{content}</div>
    },
  })

  return {
    id: generateId(),
    role: 'assistant',
    display: result.value,
  };
}



export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: { continueConversation },
  initialAIState: [],
  initialUIState: [],
});