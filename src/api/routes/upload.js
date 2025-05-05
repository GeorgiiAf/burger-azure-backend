import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { updateProductImage, deleteProductImage } from '../models/product-model.js';

const router = express.Router();
const upload = multer({ dest: 'temp/' });

router.post('/:id', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Файл не загружен' });
        }
        const productId = req.params.id;
        const outputDir = 'public/images/products';
        const outputFileName = `product_${productId}_${Date.now()}.webp`;
        const outputFile = path.join(outputDir, outputFileName);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        await sharp(req.file.path)
            .webp({ quality: 80 })
            .toFile(outputFile);

        fs.unlinkSync(req.file.path);

        const image = `/images/products/${outputFileName}`;
        await updateProductImage(productId, image);

        res.json({
            success: true,
            image: `${process.env.BASE_URL || 'http://localhost:3000'}${image}`
        });
    } catch (error) {
        console.error('Ошибка загрузки:', error);
        res.status(500).json({ error: 'Error ' });
    }
});

router.get('/check/:id', (req, res) => {
    try {
        const productId = req.params.id;
        const imageDir = 'public/images/products';
        const files = fs.readdirSync(imageDir);

        const productImages = files.filter(file =>
            file.startsWith(`product_${productId}_`)
        );

        res.json({
            exists: productImages.length > 0,
            images: productImages.map(img => ({
                url: `/images/products/${img}`,
                fullUrl: `${process.env.BASE_URL || 'http://localhost:3000'}/images/products/${img}`
            }))
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error checking images',
            details: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const image = await deleteProductImage(productId);

        if (image) {
            const fullPath = path.join('public', image);
            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            }
        }

        res.json({
            success: true,
            message: 'The image has been deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            error: 'Error deleting image',
            details: error.message
        });
    }
});

export default router;