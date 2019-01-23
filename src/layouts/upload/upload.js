import React, { Component } from 'react'
import ImageUploadContract from '../../contracts/ImageUpload.json'
import getWeb3 from '../../util/getWeb3'
import ipfs from '../../ipfs'

import '../../css/oswald.css'
import '../../css/open-sans.css'
import '../../css/pure-min.css'
import '../../App.css'

class Upload extends Component {
  constructor(props,{ authData }) {
    super(props)
    authData = this.props
    this.state = {
      ipfsHash: '',
      web3: null,
      buffer: null,
      image: null,
      account: null
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleTextChange=this.handleTextChange.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     */

    const contract = require('truffle-contract')
    const ImageUpload = contract(ImageUploadContract)
    ImageUpload.setProvider(this.state.web3.currentProvider)

    console.log(ImageUpload)

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      ImageUpload.deployed().then((instance) => {
        this.ImageUploadInstance = instance
        return this.setState({ account: accounts[0] })
        // Get the value from the contract to prove it worked.
      })
    })
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) ,image:URL.createObjectURL(file) })
      //console.log('buffer', this.state.buffer,this .state.image)
    }
  }

  handleTextChange(event) {
    this.setState({value: event.target.value});
  }
  onSubmit(event) {
    event.preventDefault()
    ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }
      this.ImageUploadInstance.createImage(result[0].hash,this.state.value,{from: this.state.account}).then((r) => {
        return
      })
    })
  }

  render() {
    return (
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your Image</h1>
              <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
              <img src={this.state.image} alt=""  className="imgs"/>
              <h2>Upload Image</h2>
              <form onSubmit={this.onSubmit} >
                <label> Description</label>
                <input   type="text" onChange={this.handleTextChange}  />
                <input type='file' onChange={this.captureFile} />
                <input type='submit' />
              </form>
            </div>
          </div>
        </main>
    );
  }
}
export default Upload
