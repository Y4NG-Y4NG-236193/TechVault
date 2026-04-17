import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase.service';

export class ProductController {
    // 1. Get all products
    static async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { data: products, error } = await supabase
                .from('Products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    // 2. Get product by ID
    static async getProductById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const { data: product, error } = await supabase
                .from('Products')
                .select('*')
                .eq('product_id', id)
                .single();

            if (error) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    // 3. Create a new product
    static async createProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, price, brand, category_id, stock, rating } = req.body;

            if (!name || price === undefined) {
                return res.status(400).json({ error: 'Name and price are required' });
            }

            const { data: newProduct, error } = await supabase
                .from('Products')
                .insert([
                    {
                        name,
                        description,
                        price,
                        brand,
                        category_id: category_id || null,
                        stock: stock || 0,
                        rating: rating || 0,
                    }
                ])
                .select()
                .single();

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(201).json(newProduct);
        } catch (error) {
            next(error);
        }
    }

    // 4. Update an existing product
    static async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const { data: updatedProduct, error } = await supabase
                .from('Products')
                .update(updates)
                .eq('product_id', id)
                .select()
                .single();

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    // 5. Delete a product
    static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const { error } = await supabase
                .from('Products')
                .delete()
                .eq('product_id', id);

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}
