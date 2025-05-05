// api/routes/upload.js
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Настройка multer для загрузки файлов
const upload = multer({ dest: 'temp/' });

// Маршрут для загрузки изображения
router.post('/:id', upload.single('image'), async (req, res) => {
    try {
        // Проверяем, есть ли файл
        if (!req.file) {
            return res.status(400).json({ error: 'Файл не загружен' });
        }

        // ID продукта из параметров URL
        const id = req.params.id;

        // Пути к файлам
        const inputFile = req.file.path;
        const outputDir = 'public/images';
        const outputFile = path.join(outputDir, `${id}.webp`);

        // Создаем директорию, если её нет
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Обрабатываем изображение с помощью sharp
        await sharp(inputFile)
            .webp({ quality: 80 })
            .toFile(outputFile);

        // Удаляем временный файл
        fs.unlinkSync(inputFile);

        // Успешный ответ
        res.json({
            success: true,
            message: 'Изображение успешно загружено',
            url: `/public/images/${id}.webp`
        });

    } catch (error) {
        console.error('Ошибка при загрузке:', error);
        res.status(500).json({ error: 'Ошибка при обработке изображения' });
    }
});




router.get('/check/:id', (req, res) => {
    const imagePath = path.join('public/images', `${req.params.id}.webp`);
    const exists = fs.existsSync(imagePath);

    res.json({
        exists,
        url: exists ? `/public/images/${req.params.id}.webp` : null
    });
});

export default router;