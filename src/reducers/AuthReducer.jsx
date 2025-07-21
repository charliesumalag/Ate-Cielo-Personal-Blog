

export const initialAuthState = {
  username: '',
  password: '',
  errors: {},
  isSubmitting: false,
};


export function AuthLoginReducer(state, action) {
    switch (action.type) {
        case 'updateField':
            return {
                ...state,
                [action.field] : action.value
            }
        case 'setErrors' : {
            return {
                ...state,
                errors: action.errors,
            }
        }
        case 'submit' : {
            return {
                ...state,
                isSubmitting: true,
            }
        }
        default:
            return state;
    }
}
