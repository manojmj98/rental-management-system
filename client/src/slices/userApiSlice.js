import { apiSlice } from "./apiSlice";
const AUTH_URL = "/api/auth";
const USER_URL = "/api/user";
const PRODUCT_URL = "api/product"

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: 'POST',
        body: data
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: 'POST',
        body: data
      }),
    }),
    update: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: 'PUT',
        body: data
      }),
    }),
    reset: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/reset`,
        method: 'PUT',
        body: data
      }),
    }),
    forgot: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot`,
        method: 'POST',
        body: data
      }),
    }),
    forgotReset: builder.mutation({
      query(data) {
        const { token, ...body } = data;
        return {
          url: `${AUTH_URL}/reset/${token}`,
          method: 'PUT',
          body: body
        }
      }
    }),
    addproduct: builder.mutation({
      query(data) {
        return {
          url: `${PRODUCT_URL}/create`,
          method: "POST",
          body: data,
        };
      },
    }),
    getproducts: builder.mutation({
      query(data) {
        return {
          url: `${PRODUCT_URL}/get-products`,
          method: "POST",
          body: data,
        };
      },
    }),
    getUsers: builder.query({
      query: () => ({
        url: USER_URL,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USER_URL}/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateMutation,
  useResetMutation,
  useForgotMutation,
  useForgotResetMutation,
  useAddproductMutation,
  useGetproductsMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
} = userApiSlice;