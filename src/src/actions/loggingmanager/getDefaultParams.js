export const getDefaultParams = (state) => {
    const {auth, request} = state

    return {
        authUserId: auth.get('id'),
        accessToken: auth.get('accessToken'),
        device: request.get('browser'),
    }
}
