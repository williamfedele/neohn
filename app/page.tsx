import { Feed } from "@/components/feed";

export default function Home() {
  return (
    <div className="max-w-5xl p-6 space-y-8">
      <h1 className="text-5xl">neohn</h1>
      <div className="">
        <Feed />
      </div>
    </div>
  );
}
