
import React, { Component } from 'react'
import ImageUploadContract from  '../contracts/ImageUpload.json'
import getWeb3 from '../util/getWeb3'


class ImageGalary extends Component {
    constructor(props,{ authData }) {
      super(props)
      authData = this.props

      this.state = {
        web3: null,
        ImageList: [],
        account: null,
        imageFilter:''
      }
      this.SearchUpdate=this.SearchUpdate.bind(this);
    }

    componentWillMount() {
      getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })
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
      const contract = require('truffle-contract')
      const ImageUpload = contract(ImageUploadContract)
      ImageUpload.setProvider(this.state.web3.currentProvider)
      this.list=[]
      let accounts=await this.promisify(cb =>this.state.web3.eth.getAccounts(cb));
      let account=accounts[0];
      this.setState({ account: accounts[0] })

      this.ImageUploadInstance=await ImageUpload.deployed();
       //let tx= await this.ImageUploadInstance.createImage("ipfs2","desc2",{from:account})
      this.imageslist= await this.ImageUploadInstance.getImages.call({from :account})

      for (let i=0 ; i<this.imageslist.length;i++){
        let img=  await this.ImageUploadInstance.getImage.call(this.imageslist[i].toNumber(),{from :account})
        this.list.push({IPFS:img[0],Description:img[1]})
      }

      this.setState({ImageList:this.list})
    }

    render() {
      let FilteredImage=this.state.ImageList.filter((Img)=>{
        return Img.Description.indexOf(this.state.imageFilter) !==-1;
      });

      return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Profile</h1>
            <p>Change these details in UPort to see them reflected here.</p>
                <div className="row">
                  <input type="text" value={this.state.imageFilter} onChange={this.SearchUpdate}/>
                </div>
                <div className="row grids">
                  {FilteredImage.map((Img,i)=>
                    <figure key={i}>
                      <img src={`https://ipfs.io/ipfs/${Img.IPFS}`}   alt=""  className="imgs"/>
                      <figcaption>{Img.Description}</figcaption>
                    </figure>
                  )}
                </div>
          </div>
        </div>
      </main>
      );
    }
  }
  export default ImageGalary
