import { IVehicle } from '@/lib/types/vehicle';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/vehicles',
  }),
  tagTypes: ['Vehicles'], // Определяем тип тега
  endpoints: (builder) => ({
    getVehicles: builder.query<IVehicle[], void>({
      query: () => '',
      providesTags: ['Vehicles'], // Связываем этот запрос с тегом 'Vehicles'
    }),
    addVehicle: builder.mutation<IVehicle, FormData>({
      query: (newVehicle) => ({
        url: '',
        method: 'POST',
        body: newVehicle,
        headers: {
          accept: 'application/json',
        },
      }),
      invalidatesTags: ['Vehicles'], // Инвалидируем тег, чтобы обновить кеш
    }),
    getVehiclesCount: builder.query<number, void>({
      query: () => '/count',
      providesTags: ['Vehicles'], // Инвалидируем тег при обновлении
    }),
    updateVehicle: builder.mutation<
      IVehicle,
      { id: number; updatedVehicle: Partial<IVehicle> }
    >({
      query: ({ id, updatedVehicle }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updatedVehicle,
      }),
      invalidatesTags: ['Vehicles'], // Инвалидируем тег при обновлении
    }),
    deleteVehicle: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vehicles'], // Инвалидируем тег при удалении
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
  useGetVehiclesCountQuery,
} = vehiclesApi;
