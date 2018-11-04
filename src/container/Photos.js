import React from "react";
import { connect } from "react-redux";
import { getPhotos } from "../actions/photosActions";
import PhotoTab from "../component/PhotoTab";
import ReactLoading from "react-loading";

class Photos extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPhotos());
  }

  renderPhotoTab = () => {
    return this.props.photos.map((photo, index) => {
      return (
        <PhotoTab
          key={`photo_box_${index}`}
          imageSrc={`https://farm${photo.farm}.staticflickr.com/${
            photo.server
          }/${photo.id}_${photo.secret}_m.jpg`}
          userId={photo.owner}
        />
      );
    });
  };

  render() {
    if (this.props.isFetchingPhotos) {
      return (
        <div className="photos-wrapper">
          <div className="center-screen">
            <ReactLoading
              type="spinningBubbles"
              color="#393f4d"
              className="spinner-centered"
            />
          </div>
        </div>
      );
    }
    return <div className="photos-wrapper">{this.renderPhotoTab()}</div>;
  }
}

const mapStateToProps = state => ({
  photos: state.photos.photos,
  isFetchingPhotos: state.photos.isFetching,
  error: state.photos.error
});

export default connect(mapStateToProps)(Photos);
