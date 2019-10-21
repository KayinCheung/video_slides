import React, { Component } from 'react';
import './App.css';

import SlidesPreview from './SlidesPreview'
import SlideCreation from './SlideCreation'

import { connect } from 'react-redux'

class Body extends Component {
  render() {
    return (
      <div className="container is-centered" style={{ flex: 1 }}>

        <SlidesPreview />
        <br />
        <label className="label has-text-centered">Modifying Slide {this.props.current_slide}</label>
        <br />
        <SlideCreation key={this.props.current_slide} />
        


      </div>
    );
  }
}

const mapStateToProps = state => ({
  current_slide: state.slideSelection.current_slide,
})

export default connect(mapStateToProps, {})(Body);
