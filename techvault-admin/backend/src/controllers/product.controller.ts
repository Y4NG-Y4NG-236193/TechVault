import { Request, Response, NextFunction } from 'express';
import { supabase } from '../services/supabase.service';

export class ProductController {
    // 1. Get all products
    static async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { data: products, error } = await supabase
                .schema('TechVault')
                .from('Products')
                .select(`
                    *,
                    images:Product_Images(*),
                    specs:Product_Specifications(*)
                `)
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
                .schema('TechVault')
                .from('Products')
                .select(`
                    *,
                    images:Product_Images(*),
                    specs:Product_Specifications(*)
                `)
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
            const { name, description, price, brand, category_id, stock, rating, images, specs } = req.body;

            if (!name || price === undefined) {
                return res.status(400).json({ error: 'Name and price are required' });
            }

            // 1. Insert the main product
            const { data: newProduct, error: productError } = await supabase
                .schema('TechVault')
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

            if (productError) {
                return res.status(400).json({ error: productError.message });
            }

            const product_id = newProduct.product_id;

            // 2. Insert Images if provided
            if (images && Array.isArray(images) && images.length > 0) {
                const imageData = images.map((img: any) => ({
                    product_id,
                    image_url: img.image_url,
                    is_main: img.is_main || false
                }));

                const { error: imageError } = await supabase
                    .schema('TechVault')
                    .from('Product_Images')
                    .insert(imageData);

                if (imageError) {
                    console.error('Error inserting images:', imageError.message);
                }
            }

            // 3. Insert Specifications if provided
            if (specs && typeof specs === 'object') {
                const { error: specError } = await supabase
                    .schema('TechVault')
                    .from('Product_Specifications')
                    .insert([
                        {
                            product_id,
                            spec_key: specs // Total JSON object
                        }
                    ]);

                if (specError) {
                    console.error('Error inserting specs:', specError.message);
                }
            }

            // Fetch the final product with all relations to return
            const { data: finalProduct } = await supabase
                .schema('TechVault')
                .from('Products')
                .select('*, images:Product_Images(*), specs:Product_Specifications(*)')
                .eq('product_id', product_id)
                .single();

            res.status(201).json(finalProduct || newProduct);
        } catch (error) {
            next(error);
        }
    }

    // 4. Update an existing product
    static async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { images, specs, ...productUpdates } = req.body;

            // 1. Update main product info
            const { data: updatedProduct, error: productError } = await supabase
                .schema('TechVault')
                .from('Products')
                .update(productUpdates)
                .eq('product_id', id)
                .select()
                .single();

            if (productError) {
                return res.status(400).json({ error: productError.message });
            }

            // 2. Handle Images (Diffing and Overwriting)
            if (images && Array.isArray(images)) {
                // Fetch current images from DB to identify what to delete from storage
                const { data: currentImages } = await supabase
                    .schema('TechVault')
                    .from('Product_Images')
                    .select('image_url')
                    .eq('product_id', id);

                // Identify URLs that are removed in this update
                const newUrls = images.map((img: any) => img.image_url);
                const staleUrls = (currentImages || [])
                    .filter(img => !newUrls.includes(img.image_url))
                    .map(img => img.image_url);

                // Delete existing image records from database
                await supabase
                    .schema('TechVault')
                    .from('Product_Images')
                    .delete()
                    .eq('product_id', id);

                // Insert new image records
                const imageData = images.map((img: any) => ({
                    product_id: id,
                    image_url: img.image_url,
                    is_main: img.is_main || false
                }));

                await supabase
                    .schema('TechVault')
                    .from('Product_Images')
                    .insert(imageData);

                // Cleanup Storage for stale images (Best effort)
                if (staleUrls.length > 0) {
                    const pathsToDelete = staleUrls
                        .map(url => {
                            const parts = url.split('/public/products/');
                            return parts.length > 1 ? parts[1] : null;
                        })
                        .filter((path): path is string => path !== null);

                    if (pathsToDelete.length > 0) {
                        const { error: storageError } = await supabase.storage
                            .from('products')
                            .remove(pathsToDelete);
                        
                        if (storageError) {
                            console.error('Error cleaning up stale storage:', storageError.message);
                        }
                    }
                }
            }

            // 3. Handle Specs (Overwriting for simplicity)
            if (specs && typeof specs === 'object') {
                // Delete existing specs first
                await supabase
                    .schema('TechVault')
                    .from('Product_Specifications')
                    .delete()
                    .eq('product_id', id);

                // Insert new ones
                await supabase
                    .schema('TechVault')
                    .from('Product_Specifications')
                    .insert([
                        {
                            product_id: id,
                            spec_key: specs
                        }
                    ]);
            }

            // Fetch final state
            const { data: finalProduct } = await supabase
                .schema('TechVault')
                .from('Products')
                .select('*, images:Product_Images(*), specs:Product_Specifications(*)')
                .eq('product_id', id)
                .single();

            res.status(200).json(finalProduct || updatedProduct);
        } catch (error) {
            next(error);
        }
    }

    // 5. Delete a product
    static async deleteProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            // 1. Fetch Image URLs before deleting them from DB
            const { data: images } = await supabase
                .schema('TechVault')
                .from('Product_Images')
                .select('image_url')
                .eq('product_id', id);

            // 2. Delete Related Images from database
            await supabase
                .schema('TechVault')
                .from('Product_Images')
                .delete()
                .eq('product_id', id);

            // 3. Delete Related Specifications from database
            await supabase
                .schema('TechVault')
                .from('Product_Specifications')
                .delete()
                .eq('product_id', id);

            // 4. Finally, delete the Product record
            const { error } = await supabase
                .schema('TechVault')
                .from('Products')
                .delete()
                .eq('product_id', id);

            if (error) {
                return res.status(400).json({ error: error.message });
            }

            // 5. Cleanup Storage (Best effort)
            if (images && images.length > 0) {
                const pathsToDelete = images
                    .map(img => {
                        // Extract path after '/public/products/'
                        const parts = img.image_url.split('/public/products/');
                        return parts.length > 1 ? parts[1] : null;
                    })
                    .filter((path): path is string => path !== null);

                if (pathsToDelete.length > 0) {
                    const { error: storageError } = await supabase.storage
                        .from('products')
                        .remove(pathsToDelete);
                    
                    if (storageError) {
                        console.error('Error cleaning up storage:', storageError.message);
                    }
                }
            }

            res.status(200).json({ message: 'Product and related media deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}
