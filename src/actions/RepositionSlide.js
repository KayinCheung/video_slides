import { REPOSITION_SLIDE, SLIDE_EXCEED_BOUNDARIES } from './types'
import { SLIDE_SELECTION } from './types'

export const RepositionSlide = (slideNumber, move, totalSlides) => dispatch => {

    let newPosition = slideNumber + parseInt(move)

    if (newPosition < 0 || newPosition >= totalSlides || totalSlides === 1) {
        return
        //To inform user of invalid repositioning, use action SLIDE_EXCEED_BOUNDARIES and add error msg
    }

    dispatch({
        type: REPOSITION_SLIDE,
        slideNumber: slideNumber,
        newPosition: newPosition
    })

    //Ensure current slide selection is updated to the new slide's position
    dispatch({
        type: SLIDE_SELECTION,
        slide: newPosition
    })
}
