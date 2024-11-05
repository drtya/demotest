import { IVehicle } from '@/lib/types/vehicle';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface VehicleResponse {
  vehiclesWithOwnershipFlag: IVehicle[];
  totalPages: number;
}

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://demotest-rho.vercel.app/api',
  }),
  tagTypes: ['Vehicles'], // Определяем тип тега
  endpoints: (builder) => ({
    getProfileVehicles: builder.query<
      VehicleResponse,
      { searchQuery: string; page: string; pageSize: string; id: string }
    >({
      query: ({ searchQuery, page, pageSize, id }) => ({
        url: `/profile/${id}/vehicles`,
        params: {
          search: searchQuery, // Параметр поиска
          page, // Параметр пагинации
          limit: pageSize, // Количество элементов на странице
        },
      }),
      transformResponse: (response: VehicleResponse) => response,
      providesTags: ['Vehicles'], // Связываем этот запрос с тегом 'Vehicles'
    }),
    getVehicles: builder.query<
      VehicleResponse,
      { searchQuery: string; page: string; pageSize: string }
    >({
      query: ({ searchQuery, page, pageSize }) => ({
        url: '/vehicles',
        params: {
          search: searchQuery, // Параметр поиска
          page, // Параметр пагинации
          limit: pageSize, // Количество элементов на странице
        },
      }),
      transformResponse: (response: VehicleResponse) => response,
      providesTags: ['Vehicles'], // Связываем этот запрос с тегом 'Vehicles'
    }),
    addVehicle: builder.mutation<IVehicle, FormData>({
      query: (newVehicle) => ({
        url: '/vehicles',
        method: 'POST',
        body: newVehicle,
        headers: {
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Vehicles'], // Инвалидируем тег, чтобы обновить кеш
    }),
    getVehiclesCount: builder.query<number, void>({
      query: () => '/vehicles/count',
      providesTags: ['Vehicles'], // Инвалидируем тег при обновлении
    }),
    updateVehicle: builder.mutation<
      IVehicle,
      { id: number; updatedVehicle: Partial<IVehicle> }
    >({
      query: ({ id, updatedVehicle }) => ({
        url: `/vehicles/${id}`,
        method: 'PUT',
        body: updatedVehicle,
      }),
      invalidatesTags: ['Vehicles'], // Инвалидируем тег при обновлении
    }),
    deleteVehicle: builder.mutation<void, number>({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vehicles'], // Инвалидируем тег при удалении
    }),
  }),
});

export const {
  useGetProfileVehiclesQuery,
  useGetVehiclesQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useGetVehiclesCountQuery,
} = vehiclesApi;
