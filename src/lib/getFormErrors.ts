import type { Error } from "../lib/definitions";

export function getFormErrors(errors) {
  const list: Array<Error> = [];

  Object.entries(errors).forEach(([key, value]) => {
    list.push({ name: key, msg: value });
  });

  return list;
}
