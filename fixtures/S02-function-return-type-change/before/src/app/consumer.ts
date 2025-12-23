import { id } from "../lib";

export function useIt() {
  return id().toUpperCase();
}
