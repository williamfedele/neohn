import { Feed } from "@/components/feed";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto space-y-8 max-w-5xl pt-6 px-4">
      <Feed />
    </div>
  );
}
