import React, { Component } from 'react';
import './App.css';

import { connect } from 'react-redux'
import { AddSlide } from './actions/AddSlide'
import { ModifySlide } from './actions/ModifySlide'
import { RepositionSlide } from './actions/RepositionSlide'
import { DeleteSlide } from './actions/DeleteSlide'

const aspectRatio = 16/9

class SlideCreation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            caption: '',
            captionColor: 'black',
            canvasData: ''
        }

        this.handleImgUpload = this.handleImgUpload.bind(this)
    }

    componentDidMount() {
        this.drawImage()
        document.getElementById("duration").options.selectedIndex = this.props.slides[this.props.current_slide].duration
    }

    async drawImage() {
        let canvas = document.getElementById("myCanvas");
        let context = canvas.getContext("2d");


        let backgroundImg = new Image()
        backgroundImg.src = this.state.image || this.props.slides[this.props.current_slide].image;
        backgroundImg.onload = () => {
            context.drawImage(backgroundImg, 0, 0, 400, 300);
           
        let imageObj = new Image();
        imageObj.src = this.state.image || this.props.slides[this.props.current_slide].image;
        imageObj.onload = () => {

            let width = imageObj.naturalWidth
            let height = imageObj.naturalHeight

            if (height*aspectRatio > width){
                
                width = width/height * 300
                height = 300

            } else if (height*aspectRatio < width){
                height = height/width * 400
                width = 400
            } else {
                width = 400
                height = 300
            }

            context.drawImage(imageObj, (canvas.width/2 - width/2), (canvas.height/2 - height/2), width, height);
            
            context.font = "20pt Calibri";
            context.fillStyle = "#ffffff";
            context.fillText(this.state.caption || this.props.slides[this.props.current_slide].caption, 20, 20);
            //canvas.style.webkitFilter = "blur(3px)";
            this.setState({canvasData: canvas.toDataURL()})

        };
    }
    }

    async handleImgUpload(event) {
        try{
            await this.setState({ image: URL.createObjectURL(event.target.files[0]) });
        } catch (error){
            console.log(error)
        }

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
                                            this.props.current_slide,
                                            this.state.canvasData)
                                    }>
                                    Submit</button>
                            </div>
                            <div className="control">
                                <button className="button is-link" 
                                    onClick={() => this.props.DeleteSlide(this.props.current_slide, this.props.slides.length)}>
                                    Delete Slide</button>
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

export default connect(mapStateToProps, { AddSlide, ModifySlide, RepositionSlide, DeleteSlide })(SlideCreation);
