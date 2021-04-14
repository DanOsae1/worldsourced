import {TOGGLE_MODAL} from '../actions/applicationActions/ApplicationActionTypes'

const inititalState = {
    showModal: false
}

const ApplicationReducer = (state = inititalState, action) => {
    switch (action.type) {

        case TOGGLE_MODAL:
            let newState = !state.showModal
            return {
                ...state,
                showModal: newState
            }

        default:
            return {
                ...state
            }

    }
}

export default ApplicationReducer;