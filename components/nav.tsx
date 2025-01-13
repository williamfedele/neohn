import Link from "next/link";

export const Nav = () => (
  <header className="max-w-5xl py-2 p-6">
    <div className="border-b border-muted">
      <Link href="/" className="text-2xl font-bold tracking-wider px-4">
        neohn
      </Link>
    </div>
  </header>
);
