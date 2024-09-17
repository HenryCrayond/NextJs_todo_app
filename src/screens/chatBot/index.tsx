'use client'

import React, { useState } from 'react'
import { useActions, useUIState } from 'ai/rsc';
import InputFeild from '@/components/input';
import { Button } from '@nextui-org/button';
import { ClientMessage } from '@/app/action';
import { generateId } from 'ai';


export const maxDuration = 30;

export const ChatBot = () => {
    const [input, setInput] = useState<string>('');
    const [conversation, setConversation] = useUIState();
    const { continueConversation } = useActions();

    console.log(conversation, "---");

    const handleSendMessage = async () => {
        setConversation((current: ClientMessage[]) => [
            ...current, { id: generateId(), role: 'user', display: input }
        ])

        const messages = await continueConversation(input);

        setConversation((current: ClientMessage[]) => [
            ...current, messages
        ])
        setInput('')
    }

    return (
        <>
            <div className='w-full flex justify-between gap-10'>
                <div className='w-full'>
                    <InputFeild label='Enter message' name='skill' value={input} handleChange={(event: any) => setInput(event.target.value)} />
                </div>
                <div className='w-2/6 text-right'>
                    <Button disableRipple radius="full" onClick={handleSendMessage}
                        className=" rounded-lg w-full h-full font-bold p-4 bg-gradient-to-r from-teal-600 to-blue-600">
                        {"Send"}
                    </Button>
                </div>
            </div>
            <div>
                {conversation.map((message: ClientMessage) => (
                    <div key={message.id}>
                        {message.role}: {message.display}
                    </div>
                ))}
            </div>
        </>
    )
}