import { ADD_SLIDE, MODIFY_SLIDE, REPOSITION_SLIDE, DELETE_SLIDE } from '../actions/types'

const initialState = {
    slides: [{
        image: '',
        duration: 0,
        caption: '',
        captionColor: 'black',
        canvasData: '',
        error: true
    }]
}

export default function (state = initialState, action) {
    let slides, slide1, slide2
    switch (action.type) {

        //Add an empty slide when users click the + button
        case ADD_SLIDE:
            const slide = {
                image: '',
                duration: 0,
                caption: '',
                captionColor: 'black',
                canvasData: '',
                error: true
            }
            console.log((state.slides).concat(slide))
            return {
                ...state,
                slides: (state.slides).concat(slide)
            }

        //Modify current slide when user clicks "Submit" button
        case MODIFY_SLIDE:
            //Perform deep copy to change object reference
            slides = JSON.parse(JSON.stringify(state.slides));
            slides[action.slideNumber] = {
                image: action.image,
                duration: action.duration,
                caption: action.caption,
                captionColor: action.captionColor,
                error: action.error,
                canvasData: action.canvasData
            }
            return {
                ...state,
                slides: slides
            }

        //Modify current slide when user clicks "Submit" button
        case REPOSITION_SLIDE:
            //Perform deep copy to change object reference
            slides = JSON.parse(JSON.stringify(state.slides));

            slide1 = (slides[action.slideNumber])
            slide2 = (slides[action.newPosition])
            slides[action.newPosition] = slide1
            slides[action.slideNumber] = slide2

            return {
                ...state,
                slides: slides
            }

        case DELETE_SLIDE:
            slides = JSON.parse(JSON.stringify(state.slides));
            slides.splice(action.slideNumber, 1)

            return {
                ...state,
                slides: slides
            }

        default:
            return {
                ...state,
            }
    }
}