import React, { Component } from 'react';
import './App.css';

const InputField = ({ title, type="text", onChange }) => (
  <div className={`wrapper-input-$name.replace(" ", "-")`}>
    <label>{title}</label>
    <input type={type} onChange={onChange} />
  </div>
);

const FieldGroup = ({ title, fields, changeHandler }) => (
  <fieldset className={title.replace(" ", "-")}>
      <h3>{title}</h3>
      {fields.map(({ name, title, type="text" }) => (
        <InputField key={name} title={title || name} type={type} onChange={changeHandler.bind(this, name)} />
      ))}
    </fieldset>
);

const HcardPreview = ({ title, givenName="", surname="", email, phone, houseNameOrNumber, street, suburb, state, postCode, country }) => (
  <div className="hcard-preview">
    <h2>{title}</h2>
    <img className="hcard-preview-avatar" alt="Avatar" />
    <p className="hcard-preview-name">
      {givenName} {surname}
    </p>
    <div className="hcard-preview-email">
      <span>email</span>{email}
    </div>
    <div className="hcard-preview-phone">
      <span>phone</span>{phone}
    </div>
    <div className="hcard-preview-address">
      <span>address</span>
      {houseNameOrNumber} {street}
      <br /> {suburb}, {state}
    </div>
    <div className="hcard-preview-postcode">
      <span>postcode</span>{postCode}
    </div>
    <div className="hcard-preview-country">
      <span>country</span>{country}
    </div>
  </div>
);

class App extends Component {
  state = {};

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
      { name: "postcode", type: "number" },
      { name: "Country" },
    ]
  }];

  handleChange = (fieldName, e) => {
    this.setState({[fieldName]: e.target.value});
    console.log(fieldName, e.target.value);
  }

  render() {
    return (
      <div className="App">
        <div className="hcard-builder">
          <h1 className="App-title">hCard builder</h1>
          {this.fieldGroups.map((props, index) => (
            <FieldGroup key={index} {...props} changeHandler={this.handleChange} />
            ))}
          <div className="App-controls">
            <button>Upload Avatar</button>
            <button>Create hCard</button>
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
