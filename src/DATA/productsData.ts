import { Product } from "../tsthings.ts/Product";

// Update the Product type to include a category

const mockProducts: Product[] = [
  { id: 1, name: 'Luminous Foundation', price: 39.99, image: 'https://i.postimg.cc/bNgc3fFD/imagen-foundation.webp', description: 'A lightweight, long-wearing foundation that gives a natural, luminous finish.', category: 'Foundation' },
  { id: 2, name: 'Velvet Matte Lipstick', price: 24.99, image: 'https://i.postimg.cc/sDq8nf42/velvet.webp', description: 'A highly-pigmented, long-lasting lipstick with a velvety matte finish.', category: 'Lipstick' },
  { id: 3, name: 'Hydrating Primer', price: 29.99, image: 'https://i.postimg.cc/g0DgPG88/hydrating-primer.avif', description: 'A nourishing primer that preps your skin for smooth makeup application.', category: 'Primer' },
  { id: 4, name: 'Glow Highlighter', price: 19.99, image: 'https://i.postimg.cc/Xqh2DxFP/glowH.jpg', description: 'A silky highlighter that adds a radiant glow to your complexion.', category: 'Highlighter' },
  { id: 5, name: 'Eyeshadow Palette', price: 49.99, image: 'https://i.postimg.cc/0jrWfh6m/eyeshadow-Palette.jpg', description: 'A versatile palette featuring a range of highly-pigmented eyeshadows for any look.', category: 'Eyeshadow' },
];

export default mockProducts;