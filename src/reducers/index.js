import { combineReducers } from 'redux'
import SlideReducer from './SlideReducer'
import slideSelectionReducer from './slideSelectionReducer';

export default combineReducers({
    slide: SlideReducer,
    slideSelection: slideSelectionReducer
})