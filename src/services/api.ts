import axios from "axios";

export const fetchProducts = async () => {
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
