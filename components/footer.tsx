import Link from "next/link";

export const Footer = () => (
  <footer className="max-w-5xl text-xs">
    <div className="text-center justify-center items-center pb-6">
      <Link
        href="https://github.com/williamfedele/neohn"
        className="text-muted-foreground hover:text-primary-foreground transition-colors"
      >
        github
      </Link>
    </div>
  </footer>
);
