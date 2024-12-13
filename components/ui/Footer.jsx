import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t justify-end self-end bg-background">
      <div className="max-w-[78rem] px-2 mx-auto flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex items-center gap-2">
          <Logo width={20} height={20} />
          <span className="text-xl font-bold">AUCSOME</span>
        </div>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/listings"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Listings
          </Link>
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Home
          </Link>
          <Link
            href="/#faq"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            FAQ
          </Link>
        </nav>
      </div>
    </footer>
  );
}
