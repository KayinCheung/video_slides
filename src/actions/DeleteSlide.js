import { DELETE_SLIDE, SLIDE_SELECTION } from './types'

export const DeleteSlide = (slideNumber, total_slides) => dispatch => {

    if (total_slides <= 1){
        return
    }

    console.log(total_slides)
    console.log(slideNumber)

    dispatch({
        type: DELETE_SLIDE,
        slideNumber: slideNumber,
    })

    dispatch({
        type: SLIDE_SELECTION,
        slide: slideNumber === 0 ? 0 : slideNumber - 1
    })
}
