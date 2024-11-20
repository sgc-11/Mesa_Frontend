export interface Model {
  id: number;
  name: string;
  image: string;
}

 export interface FashionEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  models: Model[];
  images: string[];
}


const mockEvents: FashionEvent[] = [
  {
    id: 1,
    title: "Summer Gala 2024",
    date: "2024-07-15",
    time: "19:00",
    location: "Grand Plaza Hotel, New York",
    description: "Our annual summer showcase featuring the latest in haute couture and ready-to-wear collections.",
    models: [
      { id: 1, name: "Alice Johnson", image: "/api/placeholder/100/100" },
      { id: 2, name: "Bob Smith", image: "/api/placeholder/100/100" },
    ],
    images: ["src/assets/eventosimg.avif", "src/assets/salonEventosNY.jpeg"],
  },
  {
    id: 2,
    title: "Autumn Fashion Week",
    date: "2024-09-22",
    time: "14:00",
    location: "Metropolitan Museum, Paris",
    description: "Experience the cutting-edge trends for the upcoming autumn season in this week-long extravaganza.",
    models: [
      { id: 3, name: "Carol Davis", image: "/api/placeholder/100/100" },
      { id: 4, name: "David Brown", image: "/api/placeholder/100/100" },
    ],
    images: ["src/assets/eventosimg.avif"],
  },
];

export default mockEvents;
