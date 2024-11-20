// src/types.ts
export interface FashionEvent {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    participants?: Model[];
  }
  
  export interface Model {
    id: number;
    name: string;
    bio?: string;
    email: string;
    phone?: string;
    photos?: Media[];
    events?: MesaEvent[];
  }
  
  export interface Media {
    id: string;
    url: string;
    description: string;
    price?: number;
    model?: Model;
  }
  
  export interface MesaEvent {
    id: string;
    name: string;
    description: string;
    date: Date;
    location: string;
    participants?: Model[];
  }
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
  }
  
  export interface Media {
    id: string;
    url: string;
    description: string;
    price?: number;
    model?: Model;
  }
  
  export interface Membership {
    id: string;
    name: string;
    email: string;
    price: number;
    isActive: boolean;
    benefits:string;
  }
  