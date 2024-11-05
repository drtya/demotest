import { IVehicle } from '@/lib/types/vehicle';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface VehicleResponse {
  vehicles: IVehicle[];
  totalPages: number;
}

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://demotest-rho.vercel.app/api',
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getVehiclesInCart: builder.query<
      VehicleResponse,
      { searchQuery: string; page: string; pageSize: string }
    >({
      query: ({ searchQuery, page, pageSize }) => ({
        url: `/cart`,
        params: {
          search: searchQuery, // Параметр поиска
          page, // Параметр пагинации
          limit: pageSize, // Количество элементов на странице
        },
      }),
      transformResponse: (response: VehicleResponse) => response,
      providesTags: ['Cart'],
    }),
    addVehicleInCart: builder.mutation<string, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Cart'],
    }),
    removeVehicleFromCart: builder.mutation<string, string>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
        headers: {
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetVehiclesInCartQuery,
  useAddVehicleInCartMutation,
  useRemoveVehicleFromCartMutation,
} = cartApi;
