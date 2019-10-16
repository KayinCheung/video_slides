import { ADD_SLIDE, MODIFY_SLIDE, REPOSITION_SLIDE } from '../actions/types'

const initialState = {
    slides: [{
        image: '',
        duration: 0,
        caption: '',
        captionColor: 'black',
        error: true
    }]
}

export default function (state = initialState, action) {
    let slides
    switch (action.type) {

        //Add an empty slide when users click the + button
        case ADD_SLIDE:
            const slide = {
                image: '',
                duration: 0,
                caption: '',
                captionColor: 'black',
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
            }
            return {
                ...state,
                slides: slides
            }

        //Modify current slide when user clicks "Submit" button
        case REPOSITION_SLIDE:
            //Perform deep copy to change object reference
            slides = JSON.parse(JSON.stringify(state.slides));
            console.log(slides)
            let slide1 = (slides[action.slideNumber])
            let slide2 = (slides[action.newPosition])
            slides[action.newPosition] = slide1
            slides[action.slideNumber] = slide2
            console.log(slides)
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