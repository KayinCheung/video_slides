import { MODIFY_SLIDE } from './types'

export const ModifySlide = (image, duration, caption, captionColor, slideNumber) => dispatch => {

    //Perform all error checking here. Eg empty captions, invalid duration
    let error = false
    if (isNaN(duration) || duration < 1) {
        error = true
    }

    dispatch({
        type: MODIFY_SLIDE,
        image: image,
        duration: duration,
        caption: caption,
        captionColor: captionColor,
        slideNumber: slideNumber,
        error: error
    })
}
