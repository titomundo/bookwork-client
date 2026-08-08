import { useAuth } from "../utils/AuthContext";

export function Logout() {
  const { logout } = useAuth();

  return (
    <button
      className="py-0.5 px-2 text-sm bg-red-400 text-white font-semibold rounded-md hover:bg-red-500/90 hover:cursor-pointer"
      onClick={logout}
    >
      Log out
    </button>
  );
}
