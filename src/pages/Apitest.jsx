import React, { useEffect, useState } from 'react';

const Apitest = () => {
  const [photo, setPhoto] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        setPhoto(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {photo.slice(0, 40).map((item) => (
        <img key={item.id}  src={item.url} alt={item.title} className="w-full h-32 object-cover rounded" />
      ))}
    </div>
  );
};

export default Apitest;