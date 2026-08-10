import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-emerald-800 text-left p-2 text-gray-100 w-full">
      <Link
        to="/dashboard"
        className="py-1 px-3 font-bold text-lg inline rounded-md hover:bg-gray-400/40"
      >
        <span>Bookworm</span>
      </Link>
      <Link
        to="/profile"
        className="py-1 px-3 inline font-semibold float-right rounded-md hover:bg-gray-400/40"
      >
        <span>Profile</span>
      </Link>
    </header>
  );
}
