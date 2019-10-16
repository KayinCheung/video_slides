import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux'
import { AddSlide } from './actions/AddSlide'
import { ModifySlide } from './actions/ModifySlide'
import { RepositionSlide } from './actions/RepositionSlide'

class SlideCreation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            caption: '',
            captionColor: 'black'
        }

        this.handleImgUpload = this.handleImgUpload.bind(this)
    }

    componentDidMount() {
        this.drawImage()
        document.getElementById("duration").options.selectedIndex = this.props.slides[this.props.current_slide].duration
    }

    drawImage() {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");
        var imageObj = new Image();
        imageObj.onload = () => {
            context.drawImage(imageObj, 0, 0, 400, 300);
            context.font = "20pt Calibri";
            context.fillStyle = "#ffffff";
            context.fillText(this.state.caption || this.props.slides[this.props.current_slide].caption, 20, 20);
        };
        imageObj.src = this.state.image || this.props.slides[this.props.current_slide].image;
        context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height,
            0, 0, canvas.width, canvas.height)
    }

    async handleImgUpload(event) {
        await this.setState({ image: URL.createObjectURL(event.target.files[0]) });
        this.drawImage()
    };

    async handleCaptionChange(event) {
        await this.setState({ caption: event.target.value })
        this.drawImage()
    }

    render() {

        let { image, durationProp, caption } = this.props.slides[this.props.current_slide]
        let left = '<'
        let right = '>'
        return (
            <div className="columns">
                <div className="column is-half">
                    <div className="box" style={{ height: "420px" }}>

                        <label className="label has-text-left">Upload image file</label>
                        <br />
                        <input type="file" onChange={this.handleImgUpload} id="imgupload" />
                        <br /><br />

                        <div className="field">
                            <label className="label has-text-left">Duration</label>
                            <div className="control">
                                <div className="select">
                                    <select id="duration">
                                        <option>1 second</option>
                                        <option>2 seconds</option>
                                        <option>3 seconds</option>
                                        <option>4 seconds</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label has-text-left">Caption</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Add a caption for current slide" value={this.state.caption || caption}
                                    onChange={(e) => { this.handleCaptionChange(e) }}></textarea>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <button className="button is-link"
                                    onClick={() =>
                                        this.props.ModifySlide(
                                            (this.state.image || image),
                                            document.getElementById("duration").options.selectedIndex,
                                            (this.state.caption || caption),
                                            this.state.captionColor,
                                            this.props.current_slide)
                                    }>
                                    Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link" disabled>Delete Slide</button>
                            </div>
                            <div className="control">
                                <button className="button is-success"
                                    onClick={() => this.props.RepositionSlide(this.props.current_slide, -1, this.props.slides.length)}>
                                    {left}</button>
                            </div>
                            <div className="control">
                                <button className="button is-success"
                                    onClick={() => this.props.RepositionSlide(this.props.current_slide, 1, this.props.slides.length)}>
                                    {right}</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="column is-half">
                    <div className="box" style={{ height: "420px" }}>
                        <label className="label has-text-left">Image Preview</label>
                        <canvas id="myCanvas" width="400" height="300"></canvas>
                    </div>
                </div>

            </div>

        );
    }
}

const mapStateToProps = state => ({
    current_slide: state.slideSelection.current_slide,
    slides: state.slide.slides,
    lastUpdate: state.slide.lastUpdate
})

export default connect(mapStateToProps, { AddSlide, ModifySlide, RepositionSlide })(SlideCreation);
