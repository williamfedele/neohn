import Link from "next/link";

export const Footer = () => (
  <footer className="max-w-5xl text-xs px-4">
    <div className="border-t border-muted text-center justify-center items-center py-8">
      <Link
        href="https://github.com/williamfedele/neohn"
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        github
      </Link>
    </div>
  </footer>
);
