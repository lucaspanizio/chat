import { useMutation } from '@tanstack/react-query';
import { axios } from '@/libs/axios';
import type { SignIn } from '../models/login';

export const useSignIn = () => {
  const { mutate, isPending } = useMutation<SignIn.Response, Error, SignIn.Payload>({
    mutationFn: async ({ username, password }) => {
      const response = await axios.post('/login', { username, password });
      return response.data;
    },
  });
  return { signIn: mutate, isPending };
};
