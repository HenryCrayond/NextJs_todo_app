let todoSkills: { id: number|null; label: string; }[] = [];

export const createSkills = async (skill: string) => {
    const newSkill = { id: todoSkills?.length + 1, label: skill };
    todoSkills?.push(newSkill);
    return newSkill
}

export const getTodos = async () => {
    return todoSkills
}

export const deleteSkills = async (id: number) => {
    return todoSkills = todoSkills?.filter((todo) => todo.id !== id);
}

export const updateSkills = async (value: { id?: number | null, label: string }) => {
    const updated = todoSkills?.map((skill) => skill?.id === value?.id ? { ...skill, ...value } : skill);
    return todoSkills = updated
}