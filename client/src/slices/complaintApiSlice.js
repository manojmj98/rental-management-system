import { apiSlice } from './apiSlice';
const COMPLAINT_URL = '/api/complaint';

export const complaintApiSlice = apiSlice.injectEndpoints({
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
      query(data) {
        return {
          url: `${COMPLAINT_URL}/updatebyid`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    getComplaintById: builder.query({
      query(data) {
        return {
          url: `${COMPLAINT_URL}/get-complaintbyid`,
          method: 'GET',
          params: data,
        };
      },
    }),
  }),
});

export const {
    useCreateComplaintMutation,
    useGetComplaintsQuery,
    useUpdateStatusMutation,
    useGetComplaintByIdQuery
} = complaintApiSlice;
