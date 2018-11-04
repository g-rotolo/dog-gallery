import React from "react";
import { connect } from "react-redux";
import { getPhotos } from "../actions/photosActions";
import { getAllUsers } from "../actions/usersActions";
import Photo from "../component/Photo";
import UserInfo from "../component/UserInfo";

class Photos extends React.Component {
  componentDidMount() {
    this.props.dispatch(getPhotos()).then(() => {
      console.log(this.props);
      this.props.dispatch(getAllUsers(this.props.photos));
    });
  }

  renderPhotoBox = () => {
    return this.props.photos.map((photo, index) => {
      return (
        <div key={`photo_box_${index}`} className="photo-container">
          <UserInfo user={this.props.users[index]} />
          <Photo
            src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${
              photo.id
            }_${photo.secret}_m.jpg`}
          />
        </div>
      );
    });
  };

  renderPhotoElement;
  render() {
    if (this.props.isFetchingPhotos && this.props.isFetchingUsers) {
      return <div>Loading...</div>;
    }
    return <div className="photos-wrapper">{this.renderPhotoBox()}</div>;
  }
}

const mapStateToProps = state => ({
  photos: state.photos.photos,
  users: state.users.users,
  isFetchingPhotos: state.photos.isFetching,
  isFetchingUsers: state.users.isFetching,
  error: state.photos.error
});

export default connect(mapStateToProps)(Photos);
