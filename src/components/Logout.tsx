import { useAuth } from "../utils/AuthContext";

export function Logout() {
  const { logout } = useAuth();

  return (
    <button
      className="py-1 px-1.5 text-xs bg-red-700/20 text-red-700 font-medium rounded-sm hover:bg-red-500/90 hover:cursor-pointer"
      onClick={logout}
    >
      Log out
    </button>
  );
}
