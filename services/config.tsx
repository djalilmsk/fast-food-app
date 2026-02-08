import axios from 'axios';
import { QueryClient } from '@tanstack/react-query'

// ======================
//  React Query Client
// ======================

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
})

// ======================
//  Axios Instance
// ======================

const url = 'https://fast-food-4xqh.onrender.com/api/v1/';

export const customFetch = axios.create({
  baseURL: url,
  withCredentials: true,
});
