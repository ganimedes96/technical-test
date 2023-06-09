import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PostProps } from '../@types/IPost';
import blogImg from '../assets/blog.svg';
import { CardPost } from '../components/CardPost';
import { api } from '../services/api';

export const Home = () => {
  const [listPost, setListPost] = useState<PostProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchPosts = async () => {
    const { data } = await api.get('/posts');
    setListPost(data);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listPost.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(listPost.length / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!listPost) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className='flex items-start justify-around my-10'>
        <div className='text-gray-200 flex flex-col items-start justify-center gap-5'>
          <h3 className='font-semibold md:text-2xl text-xl'>Hey, Welcome</h3>
          <h1 className='font-bold  text-4xl md:text-6xl'>
            News about the <span className='text-blue-400'>Dev</span> World
          </h1>
        </div>
        <div>
          <img src={blogImg} alt='a woman in a yellow shirt' />
        </div>
      </section>
      <section>
        <div className='flex flex-col gap-10 max-w-[900px] w-full mx-auto py-8 px-5 divide-y divide-gray-300'>
          {currentItems.map((post) => (
            <NavLink to={`/post/${post.id}`} key={post.id} data-testid={`link${post.id}`}>
              <CardPost title={post.title} body={post.body} testId={post.id}/>
            </NavLink>
          ))}
        </div>
        <div className='flex items-center justify-center gap-2 my-5'>
          {pageNumbers.map((pageNumber) => (
            <button
              data-testid={`btn${pageNumber}`}  
              className={`${
                currentPage === pageNumber
                  ? 'bg-yellow-500 text-gray-100'
                  : 'bg-yellow-700'
              } text-lg text-gray-200 p-2 w-10 rounded`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};
