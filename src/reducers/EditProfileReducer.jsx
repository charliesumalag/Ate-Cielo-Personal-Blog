

export const initialEditProfileState = {
  name: '',
  image: '',
  errors: {},
};


export function EditProfileReducer(state, action) {
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
