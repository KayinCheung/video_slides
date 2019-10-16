import { SLIDE_SELECTION } from './types'

export const handleSlideSelection = (slide_number) => dispatch =>{
    dispatch({
        type: SLIDE_SELECTION,
        slide: slide_number
    })
}
        