import React from "react";
import { connect } from "react-redux";
import { getUser } from "../actions/usersActions";
import ReactLoading from "react-loading";

class PhotoTab extends React.Component {
  state = {
    user: {}
  };
  componentDidMount() {
    this.props.dispatch(getUser(this.props.userId)).then(response => {
      this.setState({
        user: this.props.user
      });
    });
  }

  truncate(string, length) {
    if (string.length > length) return string.substring(0, length) + "...";
    else return string;
  }

  renderPhotoCaption = () => {
    if (this.state.user.username) {
      return (
        <div className="caption-container">
          {this.truncate(this.state.user.username._content, 35)}
        </div>
      );
    }
    return (
      <div className="caption-container">
        <ReactLoading
          type="spinningBubbles"
          color="#393f4d"
          className="spinner-margin-right"
          height={25}
          width={15}
        />
        <span>Loading user data</span>
      </div>
    );
  };

  render() {
    if (this.props.isFetchingUser) {
      return <div className="photo-container">Loading user...</div>;
    }
    return (
      <div className="photo-container">
        {this.renderPhotoCaption()}
        <div className="photo">
          <img alt="Loading..." src={this.props.imageSrc} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users.users,
  user: state.users.user,
  isFetchingUser: state.users.isFetching,
  error: state.users.error
});

export default connect(mapStateToProps)(PhotoTab);
