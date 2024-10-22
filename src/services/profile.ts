import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfileById: builder.query<any, string>({
      query: (id) => `/profile/${id}`,
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<any, FormData>({
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
    register: builder.mutation<any, FormData>({
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
    login: builder.mutation<any, FormData>({
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
