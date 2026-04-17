import { Router } from 'express';
// import { requireAuth } from '../middleware/auth';
import { ProductController } from '../controllers/product.controller';

const router = Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public (for dev)
 */
router.get('/api/products', ProductController.getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public (for dev)
 */
router.get('/api/products/:id', ProductController.getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Public (for dev)
 */
router.post('/api/products', ProductController.createProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Public (for dev)
 */
router.put('/api/products/:id', ProductController.updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Public (for dev)
 */
router.delete('/api/products/:id', ProductController.deleteProduct);

export default router;
