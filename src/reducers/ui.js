import {SHOW_MODAL} from "../constants/ui";


const initialState = {
    isModalOpen: false,
};

export default function uiReducer(state = initialState, action) {
    switch (action.type) {
        case SHOW_MODAL: {
            return {
                ...state,
                isModalOpen: action?.isModalOpen,
            };
        }

        default:
            return state;
    }
}
