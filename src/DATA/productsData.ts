import { Product } from "../tsthings.ts/Product";

// Update the Product type to include a category

const mockProducts: Product[] = [
  { id: 1, name: 'Luminous Foundation', price: 39.99, image: 'src/assets/imagen_foundation.webp', description: 'A lightweight, long-wearing foundation that gives a natural, luminous finish.', category: 'Foundation' },
  { id: 2, name: 'Velvet Matte Lipstick', price: 24.99, image: 'src/assets/velvet.webp', description: 'A highly-pigmented, long-lasting lipstick with a velvety matte finish.', category: 'Lipstick' },
  { id: 3, name: 'Hydrating Primer', price: 29.99, image: 'src/DATA/hydrating_primer.avif', description: 'A nourishing primer that preps your skin for smooth makeup application.', category: 'Primer' },
  { id: 4, name: 'Glow Highlighter', price: 19.99, image: 'src/DATA/glowH.jpeg', description: 'A silky highlighter that adds a radiant glow to your complexion.', category: 'Highlighter' },
  { id: 5, name: 'Eyeshadow Palette', price: 49.99, image: 'src/DATA/eyeshadowPalette.jpg', description: 'A versatile palette featuring a range of highly-pigmented eyeshadows for any look.', category: 'Eyeshadow' },
];

export default mockProducts;