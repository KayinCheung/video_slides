import { SLIDE_SELECTION } from '../actions/types'

const initialState = {
    current_slide: 0
}

export default function (state = initialState, action) {
    switch (action.type) {

        case SLIDE_SELECTION:
            return {
                ...state,
                current_slide: action.slide
            }

        default:
            return state;
    }
}