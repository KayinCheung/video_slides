import React, { Component } from 'react';


import { connect } from 'react-redux'
import { handleSlideSelection } from './actions/slideSelectionAction'
import { AddSlide } from './actions/AddSlide'

class SlidesPreview extends Component {


  render() {

    let data = this.props.slides

    return (
      <div>
        <div className="is-flex">
          {(data).map((row, i) => (
            <div key={`slide${i}`}>
              <p>{i}</p>
              <div

                className={`has-text-centered clickableBox box paddedBox
                             ${i == this.props.current_slide ? `selectedBox` : null}`}
                style={{ width: "100px", height: "100px" }}
                onClick={() => { this.props.handleSlideSelection(i) }}>
                <div className="is-vcentered">
                  <img src={this.props.slides[i].canvasData} />
                </div>

              </div>
            </div>

          ))}

          <div>
            Add Slide
             <div className="has-text-centered clickableBox box paddedBox is-vcentered"
              style={{ width: "100px", height: "100px" }}
              onClick={() => { this.props.AddSlide() }}>

              <img src="https://cdn3.iconfinder.com/data/icons/ui-icons-5/16/plus-small-01-512.png" />


            </div>
          </div>

        </div>

      </div>

    );
  }
}


const mapStateToProps = state => ({
  slides: state.slide.slides,
  current_slide: state.slideSelection.current_slide,
  lastSlideUpdated: state.slide.lastSlideUpdated,
  lastUpdateTime: state.slide.lastUpdateTime
})

export default connect(mapStateToProps, { handleSlideSelection, AddSlide })(SlidesPreview);