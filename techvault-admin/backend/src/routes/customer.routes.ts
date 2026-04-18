import { Router } from 'express';
// import { requireAuth } from '../middleware/auth';
import { CustomerController } from '../controllers/customer.controller';

const router = Router();

// Get all customers
router.get('/api/customers', CustomerController.getCustomers);

// Get specific customer by ID
router.get('/api/customer/:id', CustomerController.getCustomerById);

// Create customer
router.post('/api/customers', CustomerController.createCustomer);

// Update customer
router.put('/api/customers/:id', CustomerController.updateCustomer);

// Delete customer
router.delete('/api/customers/:id', CustomerController.deleteCustomer);

export default router;
