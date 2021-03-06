import {
    GET_LAYOUT_SUCCESS, GET_SETTINGS_SUCCESS, SET_TAB_ACTIVE_SUCCESS, TOGGLE_EDIT_MODE_SUCCESS,
    TOGGLE_ADD_MODAL_SUCCESS, TOGGLE_EDIT_MODAL_SUCCESS, TOGGLE_ADD_TAB_MODAL_SUCCESS, TOGGLE_DELETE_TAB_MODAL_SUCCESS,
    TOGGLE_EDIT_TAB_MODAL_SUCCESS
} from '../actions/Dashboard.actions'

const dashboardReducerDefaultState = {
    layout: null,
    settings: null,
    tabActive: 0,
    isEditMode: false,
    isEditModal: false,
    isAddModal: false,
    isAddTabModal: false,
    isDeleteTabModal: false,
    isEditTabModal: false,
    editedTab: 0
};

export default (state = dashboardReducerDefaultState, action) => {
    switch (action.type) {
        case GET_LAYOUT_SUCCESS:
            return { ...state, layout: action.payload.layout }

        case GET_SETTINGS_SUCCESS:
            return { ...state, settings: action.payload.settings }

        case SET_TAB_ACTIVE_SUCCESS:
            return { ...state, tabActive: action.payload }

        case TOGGLE_EDIT_MODE_SUCCESS:
            return { ...state, isEditMode: action.payload }

        case TOGGLE_ADD_MODAL_SUCCESS:
            return { ...state, isAddModal: action.payload }

        case TOGGLE_EDIT_MODAL_SUCCESS:
            return { ...state, isEditModal: action.payload.isActive, editedWidget: action.payload.i }

        case TOGGLE_ADD_TAB_MODAL_SUCCESS:
            return { ...state, isAddTabModal: action.payload.isActive }

        case TOGGLE_DELETE_TAB_MODAL_SUCCESS:
            return { ...state, isDeleteTabModal: action.payload.isActive }

        case TOGGLE_EDIT_TAB_MODAL_SUCCESS:
            return { ...state, isEditTabModal: action.payload.isActive, editedTab: action.payload.index }


        // case CLEAN_ALERTS:
        //     return { ...state, success_msgs: [], error_msgs: [] }


        default: return state
    }
}