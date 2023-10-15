import { apiSlice } from './apiSlice';
const AUTH_URL = '/api/auth';
const USER_URL = '/api/user'

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
        questionVerify: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/question`,
                method: 'POST',
                body: data
            })
        }),
        getQuestions: builder.query({
            query: (data) => ({
                url: `${AUTH_URL}/question`,
                method: 'GET',
                params: data
            })
        }),
    }),
});


export const { useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateMutation,
    useResetMutation,
    useForgotMutation,
    useForgotResetMutation,
    useQuestionVerifyMutation,
    useGetQuestionsQuery,
} = userApiSlice;