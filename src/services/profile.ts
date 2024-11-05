import { IUser } from '@/lib/types/user';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://demotest-rho.vercel.app/api',
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfileById: builder.query<IUser, string>({
      query: (id) => `/profile/${id}`,
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<IUser, FormData>({
      query: (newProfile) => ({
        url: '/profile',
        method: 'POST',
        body: newProfile,
        headers: {
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Profile'],
    }),
    register: builder.mutation<IUser, FormData>({
      query: (registerData) => ({
        url: '/register',
        method: 'POST',
        body: registerData,
        headers: {
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Profile'],
    }),
    login: builder.mutation<IUser, FormData>({
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
        headers: {
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Profile'],
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useGetProfileByIdQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = profileApi;
