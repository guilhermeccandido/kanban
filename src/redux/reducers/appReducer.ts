import { AppAction, appActionType } from "../actions/appAction";

export interface AppState {
    isSideBarOpen: boolean;
}

const initialState: AppState = {
    isSideBarOpen: false,
};

const reducer = (state = initialState, action: AppAction): AppState => {
    switch (action.type) {
        case appActionType.OPEN_SIDEBAR:
            return {
                ...state,
                isSideBarOpen: true,
            };
        case appActionType.CLOSE_SIDEBAR:
            return {
                ...state,
                isSideBarOpen: false,
            };
        default:
            return state;
    }
};

export default reducer;