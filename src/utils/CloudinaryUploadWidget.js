import React, { Component } from "react";

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOADPRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

class CloudinaryUploadWidget extends Component {
  widget = null;

  componentDidMount() {
    this.widget = window.cloudinary?.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          this.props.uploadImage(result.info.secure_url);
          this.props.handleUploadImage &&
            this.props.handleUploadImage(result.info.secure_url);
        }
      }
    );
  }

  openWidget = () => {
    if (this.widget) {
      this.widget.open();
    } else {
      console.error("Cloudinary widget is not initialized");
    }
  };

  render() {
    return <></>;
  }
}

export default CloudinaryUploadWidget;
