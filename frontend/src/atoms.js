import { atom } from "recoil";

// Todos state
export const todosState = atom({
  key: 'todosState',
  default: [],
});

// Authentication state
export const authState = atom({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null,
  },
});

export const unameState = atom({
  key:"unameState",
  default:""
})