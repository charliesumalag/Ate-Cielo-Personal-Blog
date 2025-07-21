export const authRegisterInitialState = {
    name : '',
    username : '',
    password : '',
    password_confirmation : '',
    'image': null,
    errors: {},
}


export function authRegisterReducer(state, action) {
    switch (action.type) {
        case 'updateField': {
            const { field, value, inputType, files } = action;
            return {
                ...state,
                [field]: inputType === 'file' && files?.length ? files[0] : value,
            };
        }

        case 'setErrors' :
            return{
                ...state,
                errors: action.errors
            }
        default:
            return state;
    }
}
