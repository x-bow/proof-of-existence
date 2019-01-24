# Proof of Existence

### What?
This is proof of existence DApp where user can upload an image to IPFS and verify the image and timestamp on Ethereum blockchain.

* Uses uPort to log into the application. This way users are in total control of their identity.
* Uses IPFS so data is stored in distributed system and can be publicly verified.
* Application, itself, is hosted in IPFS so it is truely decentraliced from end to end.
* Uses ENS for contract address. 

### Why?
This DApp can be used to prove the original creator (owner) of any documents like images, arts, agreements etc.

## DApp setup
- Contract (0xa4eb98fad58a66a41acc944f80a6d69c2db0316b) is deployed to Ropsten Test Network.
- On Ropsten Test Network, proofofexistence.eth is the ENS for the contract.
- The DApp is deployed on IPFS [here.](https://gateway.ipfs.io/ipfs/QmRz6kLct5qYQtfLNFwwpJ6epcCCok1dbd8oTW5i64TzbA)

### How to run DApp locally?
* Connect Metamask to Ropsten Testnet.
* Install [uPort](https://www.uport.me/) app on your phone and set up account.
* Make sure `node` and `npm` is installed.
* Clone the repo and go inside the directory.
  ```
  $ git clone https://github.com/x-bow/proof-of-existence.git
  $ cd proof-of-existence/
  ```
* Install all dependencies. Make sure all errors, if any, are resolved.
  ```
  $ npm install
  ```
*  Start local instance of the application.
    ```
    $ npm start
    ```

### How to use the DApp?
* The server will launch the app at http://localhost:3000
* Click on "Login with uPort".
* Popup box will appear. Click on "Continue with uPort". You will see QR code.
* Open uPort app on your phone and scan QR code.
* On your phone app, click on "Login with this account" and again click on "Share your information".
* You should now be logged into the website.
* Click "Choose File", then select an image.
* Type description and click "Submit".
* Wait for the transaction to be confirmed in Metamask.
* To refresh, click on "Proof of Existence" and click back on "Dashboard".
* You should see your image with timestamp.
* You can also search for all your previously uploaded images.
