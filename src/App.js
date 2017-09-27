import React, { Component } from 'react';
import './App.css';
import defaultAvatar from './avatar-default.png';

const InputField = ({ title, type="text", onChange }) => (
  <div className={`wrapper-input wrapper-input-$name.replace(" ", "-")`}>
    <label>{title}</label>
    <input type={type} onChange={onChange} />
  </div>
);

const FieldGroup = ({ title, fields, changeHandler }) => (
  <div className={`field-group ${title}.replace(" ", "-")`}>
      <h3 className="field-group-title">{title}</h3>
      {fields.map(({ name, title, type="text" }) => (
        <InputField key={name} title={title || name} type={type} onChange={changeHandler.bind(this, name)} />
      ))}
    </div>
);

const HcardPreview = ({ title="", givenName="", surname="", email="", phone="", houseNameOrNumber="", street="", suburb="", state="", postcode="", country="", avatarSrc }) => (
  <div className="hcard-preview">
    <h2 className="hcard-preview-title">{title}</h2>
    <div className="hcard-preview-header">
      <img className="hcard-preview-avatar" alt="Avatar" src={avatarSrc}/>
      <div className="hcard-preview-field hcard-preview-name">
        {givenName} {surname}
      </div>
    </div>
    <div className="hcard-preview-body">
      <div className="hcard-preview-field hcard-preview-email">
        <span>email</span>{email}
      </div>
      <div className="hcard-preview-field hcard-preview-phone">
        <span>phone</span>{phone}
      </div>
      <div className="hcard-preview-field hcard-preview-address">
        <span>address</span>{houseNameOrNumber} {street}
      </div>
      <div className="hcard-preview-field hcard-preview-address-l2">
        {suburb.length>0 && `${suburb}${ (state.length>0)? (', ' + state): ''}`}
      </div>
      <div className="hcard-preview-field hcard-preview-postcode">
        <span>postcode</span>{postcode}
      </div>
      <div className="hcard-preview-field hcard-preview-country">
        <span>country</span>{country}
      </div>
    </div>
  </div>
);

class App extends Component {
  state = { avatarSrc: defaultAvatar };

  fieldGroups = [{
    title: "Personal details",
    fields: [
      { name: "givenName", title: "Given name" },
      { name: "surname" },
      { name: "email" , type: "email" },
      { name: "phone" },
    ]
  }, {
    title: "Address",
    fields: [
      { name: "houseNameOrNumber", title: "House name or #" },
      { name: "street" },
      { name: "suburb" },
      { name: "state" },
      { name: "postcode" },
      { name: "country" },
    ]
  }];

  handleChange = (fieldName, e) => {
    this.setState({[fieldName]: e.target.value});
  }

  handleUploadAvatar = (e)  => {
    const file = e.target.files[0];

    // Only process image files.
    if (!file || !file.type.match('image.*')) {
        return;
    }

    this.setState({ avatarSrc: URL.createObjectURL(file) });
  }

  render() {
    return (
      <div className="App">
        <div className="hcard-builder">
          <h1 className="App-title">hCard Builder</h1>
          {this.fieldGroups.map((props, index) => (
            <FieldGroup key={index} {...props} changeHandler={this.handleChange} />
            ))}
          <div className="hcard-builder-controls">
            <input id="file" type="file" className="btn-input" onChange={this.handleUploadAvatar}/>
            <label htmlFor="file" className="btn-upload-avatar">Upload Avatar</label>
            <button className="btn-create-hcard">Create hCard</button>
          </div>
        </div>
        <HcardPreview
          title="Hcard preview"
          {...this.state} />
      </div>
    );
  }
}

export default App;
