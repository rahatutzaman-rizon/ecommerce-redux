
import axios from 'axios';

// Product type definition
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const photos = await axios.get("https://jsonplaceholder.typicode.com/photos");
  
  return posts.data.slice(0, 100).map((post: any, index: number) => ({
    id: post.id,
    name: post.title,
    description: post.body,
    image: photos.data[index]?.url || "",
    price: parseFloat((Math.random() * 100).toFixed(2)),
  }));
};
