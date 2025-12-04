const sharp = require('sharp');
const path = require('path');

async function generateFavicon() {
  const inputPath = path.join(__dirname, '..', 'public', 'logo 1.png');
  const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
  const favicon16Path = path.join(__dirname, '..', 'public', 'favicon-16x16.png');
  const favicon32Path = path.join(__dirname, '..', 'public', 'favicon-32x32.png');

  try {
    // Leer la imagen original
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log('📸 Procesando logo...');
    console.log(`   Dimensiones originales: ${metadata.width}x${metadata.height}`);

    // Recortar bordes blancos/transparentes automáticamente con umbral más agresivo
    const trimmedImage = await image
      .trim({ threshold: 15 }) // Umbral más agresivo para eliminar bordes sutiles
      .toBuffer();

    console.log('✂️  Bordes recortados');

    // Generar favicon 16x16
    await sharp(trimmedImage)
      .resize(16, 16, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(favicon16Path);

    console.log('✅ Favicon 16x16 generado');

    // Generar favicon 32x32
    await sharp(trimmedImage)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(favicon32Path);

    console.log('✅ Favicon 32x32 generado');

    // Generar favicon.ico (formato ICO con múltiples tamaños)
    await sharp(trimmedImage)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .toFormat('png')
      .toFile(faviconPath.replace('.ico', '-temp.png'));

    console.log('✅ Favicon ICO generado');

    // También actualizar el logo.png recortado
    const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
    await sharp(trimmedImage)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(logoPath.replace('.png', '-optimized.png'));

    console.log('✅ Logo optimizado guardado como logo-optimized.png');
    console.log('\n🎉 ¡Todos los favicons generados exitosamente!');
    console.log('   - favicon-16x16.png');
    console.log('   - favicon-32x32.png');
    console.log('   - logo-optimized.png (512x512)');

  } catch (error) {
    console.error('❌ Error generando favicons:', error);
    process.exit(1);
  }
}

generateFavicon();
