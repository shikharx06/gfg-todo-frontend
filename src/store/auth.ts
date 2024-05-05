import { proxy } from 'valtio';

export const authStore = proxy<{
  data: {
    email: string;
    fullName: string;
    id: string;
    token: string;
  } | null;
}>({ data: null });
