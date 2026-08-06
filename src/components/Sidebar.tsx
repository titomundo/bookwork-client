import { Link } from "react-router-dom";
export function Sidebar() {
  return (
    <div className="p-6 text-left bg-gray-100 h-full">
      <h1 className="font-semibold text-lg">Bookworm</h1>
      <ul>
        <li>
          <Link to="#">Businesses</Link>
        </li>
        <li>
          <Link to="#">Locations</Link>
        </li>
        <li>
          <Link to="#">Reservations</Link>
        </li>
        <li>
          <Link to="#">Users</Link>
        </li>
      </ul>
    </div>
  );
}
