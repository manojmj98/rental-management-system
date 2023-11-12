import { apiSlice } from './apiSlice';
const PRODUCT_URL = '/api/product';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query(data) {
        return {
          url: `${PRODUCT_URL}/create`,
          method: 'POST',
          body: data,
        };
      },
    }),
    getProducts: builder.query({
      query(data) {
        return {
          url: `${PRODUCT_URL}/get-products`,
          method: 'GET',
          params: data,
        };
      },
    }),
    getProductById: builder.query({
      query(data) {
        return {
          url: `${PRODUCT_URL}/get-productbyid`,
          method: 'GET',
          params: data,
        };
      },
    }),
    deleteProductById: builder.mutation({
      query(data) {
        return {
          url: `${PRODUCT_URL}/remove`,
          method: 'DELETE',
          body: data,
        };
      },
    }),
    updateProduct: builder.mutation({
      query(data) {
        return {
          url: `${PRODUCT_URL}/updatebyid`,
          method: 'PUT',
          body: data,
        };
      },
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/review`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});


export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductByIdMutation,
  useUpdateProductMutation,
  useCreateReviewMutation
} = productApiSlice;
