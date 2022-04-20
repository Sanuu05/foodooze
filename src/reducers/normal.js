import { NORMAL_LOADING , NORMAL_LOADED, NREGISTER_SUCCESS, NAUTH_ERROR, NREGISTER_FAIL, NLOGIN_FAIL, NLOGIN_SUCCESS,NLOGOUT_SUCESS} from '../action/types'

const initialState = {
    token: localStorage.getItem('normaltoken'),
    isAuthenticated: false,
    isLoading: false,
    user: false,
    signin: false 
}

const user= (state = initialState, action) => {
    switch (action.type) {
        case NORMAL_LOADING:
            return {
                ...state,
                isLoading: true

            }
        case NORMAL_LOADED:
          
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
         
        case NLOGIN_SUCCESS:
            localStorage.setItem('normaltoken', action.payload.token)
            localStorage.setItem('normaluser', JSON.stringify(action.payload.user))
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false

            }
        case NREGISTER_SUCCESS:
            
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                signin:true

            }
        case NAUTH_ERROR:
        case NLOGIN_FAIL:
        case NREGISTER_FAIL:
        case NLOGOUT_SUCESS:
            localStorage.removeItem('normaltoken')
            localStorage.removeItem('normaluser')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
            
        default:
            return state

    }
}
export default user;