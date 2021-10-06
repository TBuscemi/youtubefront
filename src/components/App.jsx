import React from 'react';
import axios from 'axios'
import './App.css';
// import VideoCard from './components/VideoCard'
import { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/button';



class App extends Component{
  constructor(props){
    super(props);
    this.state={
      searchFor: "",
      video_id: "",
      url_head: "https://www.youtube.com/embed/",
      video_url: "https://www.youtube.com/embed/pBI3lc18k8Q",
      related_videos:[]
    };
    this.searchClicked = this.searchClicked.bind(this);
  }

  async searchClicked(){
    let searchString = this.state.searchFor.split(' ').join('%');
    let response = await axios.get("https://www.googleapis.com/youtube/v3/search?q="+searchString+"&key=AIzaSyCkWL84dG2bkXEffwiI8MGLOJHzYWSSdWI");
    this.setState({video_id: response.data.items[0].id.videoId})
    this.setState({video_url: this.state.url_head + this.state.video_id})
  }


  render(){
    return (
      <div className="container text-center appstyle">
        <br/>
        <br/>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10 text-center">
            <input onChange={(event) => this.setState({searchFor: event.target.value})} value={this.state.searchFor} name="searchFor" id="searchFor" type="text" />
            <Button onClick={this.searchClicked}>Search</Button> 
            <br/>
            <br/>
            <br/>
          </div>
          <div className="col-1"> </div>
        </div>
        <div className="row">
          <div className="col-1"> </div>
          <div className="col-10 text-center"> 
            <iframe width="560" height="315" src= {this.state.video_url} 
            title="YouTube video player" frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen />
          </div>
          <div className="col-1"> </div>
        </div>
        <div className="row">
          <div className="col-1"> </div>
          <div className="col-10"> 
            <table className="videoCards" align="center">
            </table>
          </div>
          <div className="col-1"> </div>
        </div>
      </div>
    );
  }
}



export default App;