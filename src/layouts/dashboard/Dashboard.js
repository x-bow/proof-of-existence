import React, { Component } from 'react'
import ImageUploadContract from '../../contracts/ImageUpload.json'
import getWeb3 from '../../util/getWeb3'
import ipfs from '../../ipfs'
import ENS from 'ethereum-ens'

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
      ImageList: [],
      account: null,
      imageFilter:''
    }
    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.SearchUpdate=this.SearchUpdate.bind(this);
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

  promisify = (inner) =>     // helper function to use promises instead of callback for metamask web3 ,refrence :https://shawntabrizi.com/crypto/making-web3-js-work-asynchronously-javascript-promises-await/
    new Promise((resolve, reject) =>
        inner((err, res) => {
         if (err) {
           reject(err);
         } else {
           resolve(res);
          }
        })
    )

  SearchUpdate(event) {
        this.setState({imageFilter: event.target.value});
  }

  async instantiateContract() {
    this.ens = new ENS(this.state.web3.currentProvider)
    this.ImageUploadInstance = new this.state.web3.eth.Contract(ImageUploadContract.abi, await this.ens.resolver('proofofexistence.eth').addr())
    this.list = []

    let accounts = await this.promisify(cb =>this.state.web3.eth.getAccounts(cb));
    let account = accounts[0];
    this.setState({ account: accounts[0] })

    //let tx= await this.ImageUploadInstance.createImage("ipfs2","desc2",{from:account})
    this.imageslist = await this.ImageUploadInstance.methods.getImages().call({from :account})

    for (let i = 0 ; i < this.imageslist.length; i++){
      let img = await this.ImageUploadInstance.methods.getImage(this.imageslist[i]).call({from :account})
      // this.list.push({IPFS:img[0],Description:img[1], Timestamp:new Date(img[2].toNumber()).toUTCString()})
      this.list.push({IPFS:img[0],Description:img[1], Timestamp:new Date(parseInt(img[2],10)*1000).toUTCString()})
    }

    this.setState({ImageList:this.list})
  }

  captureFile(event) {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result), image:URL.createObjectURL(file) })
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
      //this.ImageUploadInstance.createImage(result[0].hash,this.state.value,{from: this.state.account}).then((r) => {
      this.ImageUploadInstance.methods.createImage(result[0].hash,this.state.value).send({from: this.state.account}).then((r) => {
        return
      })
    })
  }

  render() {
    let FilteredImage = this.state.ImageList.filter((Img)=>{
        return Img.Description.toLowerCase().indexOf(this.state.imageFilter.toLowerCase()) !==-1;
      });
    return (
      <main >
        <div className="container">
          <br/><strong>Hello, {this.props.authData.name}!</strong>
          <div className="row">
            <div className="col-lg-6">
            {/* <h1>Your Image</h1>
            <p>This image is stored on IPFS & The Ethereum Blockchain!</p> */}
              <h3>Upload Image</h3>
            </div>
            <div className="col-lg-6">
              <form onSubmit={this.onSubmit} >
              <input type='file' onChange={this.captureFile} /><br/><br/>
              <label> Description </label>
              <input type="text" onChange={this.handleTextChange} />
              <input type='submit' />
              </form>
              </div>
              </div>
              <div className="row">
              <br/><h3>Search Image</h3>
              <div className="row">
              <input type="text" value={this.state.imageFilter} onChange={this.SearchUpdate}/>
              </div>
              <div className="row grids">
              {FilteredImage.map((Img,i)=>
                <figure key={i}>
                <img src={`https://ipfs.io/ipfs/${Img.IPFS}`}   alt=""  className="imgs"/>
                <figcaption>{Img.Description}<br/>{Img.Timestamp}</figcaption>
                </figure>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default Upload
