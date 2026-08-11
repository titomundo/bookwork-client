import { NavLink } from "react-router-dom";

export function _Link(props: { text: string; to: string }) {
  return (
    <NavLink
      to={props.to}
      className="bg-yellow-500/30 hover:bg-yellow-500/40 text-yellow-700 rounded-md py-1 px-4"
    >
      {props.text}
    </NavLink>
  );
}
