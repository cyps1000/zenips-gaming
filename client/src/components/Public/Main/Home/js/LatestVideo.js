import React, { Component } from "react";
import ytOptimizer from "../../../../../utils/ytOptimizer";

class LatestVideo extends Component {
  componentDidMount() {
    ytOptimizer();
  }
  render() {
    const { id, title, large_screen } = this.props;
    let placeholder_title = title.substring(0, 100);
    if (title.length > 100) placeholder_title += "...";
    if (large_screen) {
      placeholder_title = title.substring(0, 75);
      if (title.length > 75) placeholder_title += "...";
    }
    return (
      <div className="latest-post-container text-center">
        <h1>Latest Video</h1>
        <div className="embed-responsive embed-responsive-16by9">
          <div id="title_placeholder" className="overlay-title">
            <h2>{placeholder_title}</h2>
          </div>
          <div
            className="yt-player"
            data-id={id}
            data-related="0"
            data-control="1"
            data-info="1"
            data-fullscreen="1"
          >
            <img
              src={`//i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              alt="youtube video"
            />
            <div className="yt-player-control">&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LatestVideo;
