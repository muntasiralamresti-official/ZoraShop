import axios from 'axios';
import React, { useEffect } from 'react';

const Apitest = () => {
  // const [photo, setPhoto] = useState([]);

  // useEffect(() => {
  //   fetch("https://jsonplaceholder.typicode.com/photos")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPhoto(data);
  //     });
  // }, []);

  useEffect (() => {
    (async () => {
      try {
        const comm = await axios.get("https://jsonplaceholder.typicode.com/comments");
      console.log(comm.data);
      } catch (fah) {
        console.log(fah);
        
      }
      })(); 
  },[]) ;

  return (
    <div>
      Im Muntasir
    </div>
  );
};

export default Apitest;
