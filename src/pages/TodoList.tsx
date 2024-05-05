import React, { useEffect, useState } from 'react';
import { TodoCard } from '../components/TodoCard';
import { Link, Outlet } from 'react-router-dom';
import { getAllTodos } from '../api/todo';

type Props = {};

export const TodoList = (props: Props) => {
  //   const data = [
  //     {
  //       title: 'Create frontend',
  //       description: 'A long description to test the frontend app',
  //       updatedAt: new Date(),
  //       createdAt: new Date(),
  //     },
  //     {
  //       title: 'Create frontend',
  //       description: 'A long description to test the frontend app',
  //       updatedAt: new Date(),
  //       createdAt: new Date(),
  //     },
  //     {
  //       title: 'Create frontend',
  //       description: 'A long description to test the frontend app',
  //       updatedAt: new Date(),
  //       createdAt: new Date(),
  //     },
  //     {
  //       title: 'Create frontend',
  //       description: 'A long description to test the frontend app',
  //       updatedAt: new Date(),
  //       createdAt: new Date(),
  //     },
  //     {
  //       title: 'Create frontend',
  //       description: 'A long description to test the frontend app',
  //       updatedAt: new Date(),
  //       createdAt: new Date(),
  //     },
  //   ];

  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    getAllTodos().then((data) => setTodos(data));
  }, []);

  return (
    <>
      <div className="w-screen p-4  flex flex-wrap gap-4">
        {todos.map((todo, i) => (
          <Link to={'/todo/' + todo._id} className="col-span-1 cursor-pointer">
            <TodoCard key={i} {...todo} />
          </Link>
        ))}
      </div>
    </>
  );
};
