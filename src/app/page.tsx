import Forms from "@/screens/forms/forms";
import { getSkill, handleDelete, handleEdit, handleSubmit } from '@/app/action';


export default async function Home() {

  const res = await getSkill()

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-14 bg-gradient-to-r from-teal-400 to-blue-400">
      {/* <TodoPage /> */}
      <Forms
        todos={res}
        createSkill={handleSubmit}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </main>
  );
}
