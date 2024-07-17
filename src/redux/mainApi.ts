import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../utils/utils';
export const tags = { main: 'main' };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from '../../node_modules/@reduxjs/toolkit/dist/query/react/buildHooks';
const endpoints = {
  people: '/people',
};

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPeople: builder.query<unknown, { search: string; page: number }>({
      query: (params) => ({ url: endpoints.people, params: params }),
    }),
  }),
  tagTypes: Object.values(tags),
});

export const { useGetPeopleQuery } = starWarsApi;
