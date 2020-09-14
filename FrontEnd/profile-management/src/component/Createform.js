import React, { Component } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

class Createform extends Component {
  constructor()
  {
    super();
    this.state = {
    name: '',
    receiptId: 0,
    price1: 0,
    price2: 0,
  }
}
  handleChange = ({ target: { value, name }}) => {this.setState({ [name]: value })}

  createAndDownloadPdf = (e)  => {
    e.preventDefault();
    axios.post('http://localhost:5000/create-pdf', this.state)
      .then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
      .then((res) => { axios.post('http://localhost:5000/upload') 
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'newPdf.pdf');
      })
  }

  render() {
    return (
      <form>
        Name  <textarea type="text" name="name" onChange={this.handleChange} />
        <br></br>
        Career Objective <textarea type="text" name="receiptId" onChange={this.handleChange} /> 
        <br></br>
        Professional Summery <textarea type="text" name="price1" onChange={this.handleChange} />
        <br></br>
        Projects <textarea type="text" name="price2" onChange={this.handleChange} />
        <br></br>
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </form>
    );
  }
}

export default Createform;