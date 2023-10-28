import { apiSlice } from './apiSlice';
const COMPLAINT_URL = '/api/complaint';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComplaint: builder.mutation({
      query: (data) => ({
        url: `${COMPLAINT_URL}/`,
        method: 'POST',
        body: data,
      }),
    }),
    getComplaints: builder.query({
      query: (data) => ({
        url: `${COMPLAINT_URL}/results`,
        method: 'GET',
        params: data
      }),
    }),
    updateStatus: builder.mutation({
        query: (data) => ({
          url: `${COMPLAINT_URL}/${id}`,
          method: 'PUT',
          body: data,
        }),
      }),
  }),
});

export const {
    useCreateComplaintMutation,
    useGetComplaintsQuery,
    useUpdateStatusMutation,
} = complaintApiSlice;
