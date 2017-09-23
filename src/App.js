import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const InputField = ({ name, type="text" }) => (
  <div className={`wrapper-input-$name.replace(" ", "-")`}>
    <label>{name}</label>
    <input type={type} />
  </div>
);

const FieldGroup = ({ title, fields }) => (
  <fieldset className={title.replace(" ", "-")}>
      <h3>{title}</h3>
      {fields.map(({ name, type="text" }, index) => (
        <InputField key={index} name={name} type={type} />
      ))}
    </fieldset>
);

class App extends Component {
  fieldGroups = [{
    title: "Personal details",
    fields: [
      { name: "Given name" },
      { name: "Surname" },
      { name: "Email", type: "email" },
      { name: "phone" },
      { name: "Given name", type: "text" },
    ]
  }, {
    title: "Address",
    fields: [
      { name: "House number or #" },
      { name: "Stree" },
      { name: "Suburb" },
      { name: "State" },
      { name: "Post code" },
      { name: "Country" },
    ]
  }
  ];

  render() {
    return (
      <div className="App">
        <div className="hcard-builder">
          <h1 className="App-title">hCard builder</h1>
          {this.fieldGroups.map((props, index) => (
            <FieldGroup key={index} {...props} />
            ))}
          <div className="App-controls">
            <button>Upload Avatar</button>
            <button>Create hCard</button>
          </div>
        </div>
        <div className="hcard-preview">
          <h2>Hcard preview</h2>
          <img className="avatar" />
          <p className="name"></p>
        </div>
      </div>
    );
  }
}

export default App;
