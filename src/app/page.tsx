import Listing from "@/pages/listing/page";
import TodoPage from "@/pages/todopage/todoPage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-14 bg-gradient-to-r from-teal-400 to-blue-400">
      <TodoPage />
    </main>
  );
}
