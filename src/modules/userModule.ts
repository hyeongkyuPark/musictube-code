export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

type User = {
    name: string,
    profileImg: string,
}
type UserState = {
    loading: boolean,
    data: User | null,
    error: any
}

const initialState = {
    loading: false,
    data: null,
    error: null
};

const userReducer = (state: UserState = initialState, action: any): UserState => {
    switch (action.type) {
        case GET_USER:
            return {
                loading: true,
                data: null,
                error: null
            };
        case GET_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null
            }
        case GET_USER_ERROR:
            return {
                loading: false,
                data: null,
                error: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;