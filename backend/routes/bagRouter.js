const express=require('express');

const bagRouter=express.Router();
const bagController=require('../controllers/bagController');

bagRouter.get('/wishlist/items',bagController.getWishlist);
bagRouter.post('/wishlist/:productId',bagController.postWishlist);
bagRouter.delete('/wishlist/:productId',bagController.deleteFromWishlist);
bagRouter.post('/:productId',bagController.postAddtoBag);
bagRouter.delete('/:productId',bagController.deleteFromBag);
bagRouter.get('/',bagController.getBag);
bagRouter.get('/items',bagController.getBagItems);

module.exports=bagRouter;