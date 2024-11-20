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
    url: "src/DATA/imagen_pasarela.jpg",
    type: "photo",
  },
  {
    id: 2,
    title: "",
    url: "src/DATA/maquillaje3.jpg",
    type: "photo",
  },
  {
    id: 3,
    title: "",
    url: "src/DATA/Download.mp4",
    type: "video", 
  },
];
