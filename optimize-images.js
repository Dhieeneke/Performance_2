const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = 'assets';
const optimizedDir = 'assets/optimized';

// Ensure optimized directory exists
if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
}

async function optimizeImages() {
    const files = fs.readdirSync(assetsDir);
    
    for (const file of files) {
        if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
            const inputPath = path.join(assetsDir, file);
            const outputPath = path.join(optimizedDir, file.replace(/\.(png|jpg|jpeg)$/, '.webp'));
            
            try {
                await sharp(inputPath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                
                console.log(`✅ Converted ${file} to WebP`);
            } catch (error) {
                console.error(`❌ Error converting ${file}:`, error.message);
            }
        }
    }
    
    console.log('🎉 Image optimization complete!');
}

optimizeImages().catch(console.error); 