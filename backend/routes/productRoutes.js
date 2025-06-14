import express from 'express';
const router = express.Router();


// import proudcts from '../data/products.js'; // used to get all products from JSON local file
// router.get('/', (req, res) => { // used to get all products from JSON local file
//     res.json(proudcts);
//   });
//   router.get('/:id', (req, res) => { // used to get all products from JSON local file
//     const product = proudcts.find((p) => p._id === req.params.id);
//     res.json(product);
//   });

import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts } from '../controllers/productControllers.js';
import { protect, admin } from '../middleware/authMiddleware.js'
import checkObjectId from '../middleware/checkObjectId.js';
// router.get('/', asyncHandler(async(req, res) => { // not needed as controller is used
//   const products = await Product.find({});
//   res.json(products);
// }));

router.route('/').get(getProducts).post(protect,admin, createProduct);
router.get('/top', getTopProducts);
router.route('/:id').get(checkObjectId, getProductById).put(protect, admin, checkObjectId, updateProduct).delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
export default router;