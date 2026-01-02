import { getItem, removeItem, setItem } from "./Storage";


export const zustandStorage = {
  getItem: (key: string) => {
    const value = getItem(key);
    return value ? JSON.parse(value) : null;
  },

  setItem: (key: string, value: any) => {
    setItem(key, JSON.stringify(value));
  },

  removeItem: (key: string) => {
    removeItem(key);
  },
};
