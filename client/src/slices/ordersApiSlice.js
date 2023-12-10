import { apiSlice } from './apiSlice';
const ORDERS_URL = '/api/order';
const PAYPAL_URL = '/api/config/paypal';
//TODO:Reasses which of these are needed and remove others

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url:`${ORDERS_URL}/create`,
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    processRefund: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/refund/${orderId}`,
        method: 'PUT',
      }),
    }),    
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/get-orders`,
        method: 'POST'
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
    getTotalOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/total`,
      }),
      keepUnusedDataFor: 5,
    })
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
  useGetTotalOrdersQuery,
  useProcessRefundMutation
} = ordersApiSlice;
