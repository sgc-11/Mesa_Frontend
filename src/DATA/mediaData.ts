// src/DATA/mediaData.ts
export interface Media {
  id: number;
  title: string;
  url: string;
  type: "photo" | "video";
}

export const media: Media[] = [
  {
    id: 1,
    title: "",
    url: "https://i.postimg.cc/Y2yy92Vx/imagen-pasarela.webp",
    type: "photo",
  },
  {
    id: 2,
    title: "",
    url: "https://i.postimg.cc/sDQHZdCC/maquillaje3.webp",
    type: "photo",
  },
  {
    id: 3,
    title: "",
    url: "https://i.postimg.cc/nLZ35Xjn/modelo-Maquillaje.jpg",
    type: "photo", 
  },
];
