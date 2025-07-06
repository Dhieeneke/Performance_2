const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets');
const optimizedDir = path.join(__dirname, '../assets/optimized');

// Создаем папку для оптимизированных изображений
if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath, options = {}) {
    try {
        await sharp(inputPath)
            .webp(options)
            .toFile(outputPath);
        console.log(`Optimized: ${path.basename(inputPath)}`);
    } catch (error) {
        console.error(`Error optimizing ${inputPath}:`, error);
    }
}

async function optimizeImages() {
    const files = fs.readdirSync(assetsDir);
    const imageFiles = files.filter(file => 
        /\.(png|jpg|jpeg)$/i.test(file) && !file.includes('@2x')
    );

    for (const file of imageFiles) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(optimizedDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        
        await optimizeImage(inputPath, outputPath, {
            quality: 80,
            effort: 6
        });
    }

    // Оптимизируем @2x изображения отдельно
    const retinaFiles = files.filter(file => file.includes('@2x'));
    for (const file of retinaFiles) {
        const inputPath = path.join(assetsDir, file);
        const outputPath = path.join(optimizedDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
        
        await optimizeImage(inputPath, outputPath, {
            quality: 85,
            effort: 6
        });
    }
}

optimizeImages().then(() => {
    console.log('Image optimization completed!');
}).catch(console.error); 