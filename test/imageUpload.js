const ImageUpload = artifacts.require('ImageUpload')
contract('ImageUpload', accounts => {
    var defaultAccount = accounts[0]
    var user1 = accounts[6]
    var user2 = accounts[2]

    beforeEach(async function() {
        this.contract = await ImageUpload.new({from: defaultAccount})
       // console.log(this.contract)
    })

    describe('Create new image and emits event created ', () => {

        let IPFS1="ipfshash1"
        let Description1="tag1"
        let tx
        let image

        beforeEach(async function() {
            tx = await this.contract.createImage( IPFS1,Description1, {from: user1})
            //console.log(tx)
        })

        it(' Get Created  image ', async function () {

            image = await this.contract.getImage.call(0)
            assert.equal(image[0],IPFS1)
            assert.equal(image[1],Description1)
            console.log(image[2])
           // assert.equal(star[2],"story")
        })

        it('emits the correct event (CreateImage', async function () {

            assert.equal(tx.logs[0].event, 'CreateImage')
            assert.equal(tx.logs[0].args._id.toNumber(), 0)
            assert.equal(tx.logs[0].args._from, user1)
        })
    })

    describe('upload muliple images ',
    () => {

      let IPFS1="ipfshash1"
      let Description1="tag1"

      let IPFS2="ipfshash2"
      let Description2="tag2"

      let IPFS3="ipfshash3"
      let Description3="tag3"

      let IPFS4="ipfshash4"
      let Description4="tag4"

      let tx

      let images1=[]
      let images2=[]

      beforeEach(async function() {
          await this.contract.createImage( IPFS1,Description1, {from: user1})
          await this.contract.createImage( IPFS2,Description2, {from: user1})
          await this.contract.createImage( IPFS3,Description3, {from: user2})
          await this.contract.createImage( IPFS4,Description4, {from: user1})
          images1= await this.contract.getImages.call({from: user1})
          images2= await this.contract.getImages.call({from: user2})
          //console.log(tx)
      })

      it('get all images IDs for user1 ', async function () {
          assert.equal(images1.length,3)
      })
      it('get all images IDs for user2 ', async function () {
        assert.equal(images2.length,1)
    })

    it('get images information uploaded by user1 ', async function () {
        let image1=await this.contract.getImage.call(images1[0])
        let image2=await this.contract.getImage.call(images1[1])
        let image3=await this.contract.getImage.call(images1[2])
        assert.equal(image1[0],IPFS1)
        assert.equal(image1[1],Description1)
        assert.equal(image2[0],IPFS2)
        assert.equal(image2[1],Description2)
        assert.equal(image3[0],IPFS4)
        assert.equal(image3[1],Description4)
  })
  })
})

describe('',async function(){
})


var expectThrow = async function(promise) {
    try {
        await promise
    } catch (error) {
        assert.exists(error)
        return
    }
    assert.fail('Expected an error but didnt see one!')
}
