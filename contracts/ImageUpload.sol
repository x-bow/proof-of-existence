pragma solidity ^0.4.24;

contract ImageUpload {

// state variables

    address private _owner;  // the contract creator
    struct image_info //structure to hold image information
      {
        string ipfshash;  //image ipfshash
        string tag;      // image tag as defined by the user
        uint256 timestamp;
      }
    struct images_owner
      { //struct used to link the user to all his uploaded images
        uint256[] ImagesId;
      }
    uint256  private _imagesCounter; // variable to track the count of images created

// mapping definitions

    mapping (uint256 => address)      private _ownerof;     // will be used to verify the owner of any giving image id
    mapping (uint256 => image_info)   private _ImgID;       // this mapping to link each image information to its id
    mapping (address => images_owner) private _ownerImgIDs; // mapping to link the user address to all his Images Id

// event definitions

    event CreateImage(address indexed _from, string _ipfs,  string _tag, uint256  _id);

    constructor() public {   //smart contract constructor
        _owner = msg.sender;
        _imagesCounter = 0;
    }

// functionalities

    function createImage(string _ipfs, string _tag) public {
        uint256 _img_id; // image id
        require(_ownerof[_imagesCounter] == address(0),"ID already exist!"); // this to verify this id not used before
        _img_id = _imagesCounter;   // unique image id
         _imagesCounter += 1;   // increment  imagecounter for next image upload
        image_info memory NewImage = image_info(_ipfs, _tag, block.timestamp);  // memory image object created
        _ImgID[_img_id] = NewImage;   // push new image to blockchain
        _ownerImgIDs[msg.sender].ImagesId.push(_img_id);  // mapping new imageid to the user uploaded its
        _ownerof[_img_id] = msg.sender;   // keep track the owner of each individual image uploaded id

        emit CreateImage(msg.sender,_ipfs,_tag,_img_id); // this event to log successful creation
    }

    function getImage(uint256 _img_id) public view returns (string, string, uint256) { // get specific image information
       require(_ownerof[_img_id] != address(0),"Image doesn't exist!");
       image_info memory Image_info;
       Image_info = _ImgID[_img_id];
       return (Image_info.ipfshash, Image_info.tag, Image_info.timestamp);
    }

    function getImages() public view  returns (uint256[]) { // get all images ids for the msg sender
       address _user;
       _user = msg.sender;
       return _ownerImgIDs[_user].ImagesId;
    }
}
