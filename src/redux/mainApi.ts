import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../utils/utils';
export const tags = { main: 'main' };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as _ from '../../node_modules/@reduxjs/toolkit/dist/query/react/buildHooks';
import { IPerson } from '../utils/types';
const endpoints = {
  people: '/people',
};
interface IResponse {
  count: number;
  results: IPerson[];
}

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPeople: builder.query<
      IResponse,
      { search?: string | null; page: number }
    >({
      query: (params) => ({ url: endpoints.people, params: params }),
    }),
    getPerson: builder.query<IPerson, number>({
      query: (id) => ({ url: `${endpoints.people}/${id}` }),
    }),
  }),
  tagTypes: Object.values(tags),
});

export const { useGetPeopleQuery, useLazyGetPeopleQuery, useGetPersonQuery } =
  starWarsApi;
