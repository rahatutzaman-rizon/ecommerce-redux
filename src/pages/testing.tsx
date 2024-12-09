import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define interfaces for our data
interface Post {
  id: number;
  title: string;
  body: string;
}

interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const PostsAndPhotosPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts and photos concurrently
        const [postsResponse, photosResponse] = await Promise.all([
          axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts'),
          axios.get<Photo[]>('https://jsonplaceholder.typicode.com/photos')
        ]);

        // Limit to first 10 posts and photos to prevent overwhelming the page
        setPosts(postsResponse.data.slice(0, 10));
        setPhotos(photosResponse.data.slice(0, 10));
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts and Photos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Posts Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Posts</h2>
          {posts.map((post) => (
            <div key={post.id} className="bg-white shadow rounded p-3 mb-2">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>
            </div>
          ))}
        </div>

        {/* Photos Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Photos</h2>
          <div className="grid grid-cols-2 gap-2">
            {photos.map((photo) => (
              <div key={photo.id} className="text-center">
                <img 
                  src={photo.thumbnailUrl} 
                  alt={photo.title} 
                  className="mx-auto rounded shadow"
                />
                <p className="text-xs mt-1 truncate">{photo.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsAndPhotosPage;