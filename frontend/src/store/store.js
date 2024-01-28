/*import {create} from 'zustand';

export const useAuthStore = create((set)=>({
    auth:{
        username:''
    },
    setUsername:(name)=>set((state)=>({auth:{...state.auth,username:name}}))
}))*/

import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  auth: {
    username: '',
    userId: null, // Add a property for userId
  },
  setUsername: (name) =>
    set((state) => ({
      auth: { ...state.auth, username: name },
    })),
  setUserId: (id) =>
    set((state) => ({
      auth: { ...state.auth, userId: id }, // Update userId in the auth object
    })),
}));


