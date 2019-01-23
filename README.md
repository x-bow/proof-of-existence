# Proof of Existence

### What?
This is proof of existence DApp where user can upload an image to IPFS and verify the image and timestamp on Ethereum blockchain.

### Why?
This DApp can be used to prove the original creator (owner) of any documents like images, arts, agreements etc.

## DApp setup
- Contract (0xa4eb98fad58a66a41acc944f80a6d69c2db0316b) is deployed to Ropsten Test Network.
- On Ropsten Test Network, proofofexistence.eth is the ENS for the contract.
- The DApp is deployed on IPFS [here.](https://gateway.ipfs.io/ipfs/QmRz6kLct5qYQtfLNFwwpJ6epcCCok1dbd8oTW5i64TzbA)

### How to run DApp locally?
* Connect Metamask to Ropsten Test Network.
* Install [UPort](https://www.uport.me/) app on your phone and set up account.
* Make sure `node` and `npm` is installed.
* Clone the repo and go inside the directory.
  ```
  $ git clone https://github.com/x-bow/proof-of-existence.git
  $ cd proof-of-existence/
  ```
* Install all dependencies.
  ```
  $ npm install
  ```
*  Start local instance of the application.
    ```
    $ npm start
    ```
* The server will launch the app at http://localhost:3000
* Click on "Login with UPort".
* 
