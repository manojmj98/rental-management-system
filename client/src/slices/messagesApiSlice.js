import { apiSlice } from './apiSlice';
const MESSAGE_URL = '/api/message';

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addMessage: builder.mutation({
      query(data) {
        return {
          url: `${MESSAGE_URL}/add-message`,
          method: 'POST',
          body: data,
        };
      },
    }),
    getMessages: builder.query({
      query(data) {
        return {
          url: `${MESSAGE_URL}/get-messages`,
          method: 'GET',
          params: data,
        };
      },
    }),
  }),
});

export const {
  useAddMessageMutation,
  useGetMessagesQuery,
} = messagesApiSlice;
