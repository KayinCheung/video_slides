import React, { Component } from 'react';


import { connect } from 'react-redux'
import { handleSlideSelection } from './actions/slideSelectionAction'
import { AddSlide } from './actions/AddSlide'

import GIF from 'gif.js.optimized'
import Animated_GIF from 'animated_gif'

class GenerateVideo extends Component {


    componentDidMount(){

    }

    genGif(){
 
        var ag = new Animated_GIF(); 
        ag.setSize(400, 300);
         
        for(var i = 0; i < this.props.slides.length; i++) {
            ag.addFrame(document.getElementById(`slide${i}`));
        }
         
        var animatedImage = document.createElement('img');
         
        // This is asynchronous, rendered with WebWorkers
        ag.getBase64GIF(function(image) {
            animatedImage.src = image;
            document.body.appendChild(animatedImage);
        });
    }


  render() {

    let data = this.props.slides

    return (
      <div>
        <div className="is-flex">
          {(data).map((row, i) => (
            <div key={`slide${i}`}>
              <div>

                <img src={this.props.slides[i].canvasData} />


              </div>
            </div>

          ))}
          <img id="gif"/>
          <button className="button" onClick={() => this.genGif()}>Gif gen</button>

        </div>

      </div>

    );
  }
}


const mapStateToProps = state => ({
  slides: state.slide.slides,
})

export default connect(mapStateToProps, { })(GenerateVideo);