import Toolbar from './component/NavBar/NavBar';
import {Route, Routes} from 'react-router-dom';
import Posts from './pages/Posts/Posts';
import React from 'react';
import MutatePost from './pages/MutatePost/MutatePost';
import Post from './pages/Post/Post';

const App = () => (
  <div className="container-fluid">
    <header>
      <Toolbar/>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Posts/>} />
        <Route path="/new-post" element={<MutatePost />}/>
        <Route path="/posts/:id" element={<Post />}/>
        <Route path="/posts/:id/edit" element={<MutatePost />}/>
        <Route path="*" element={<h3 className="text-center fs-1">Not Found</h3>}/>
      </Routes>
    </main>
  </div>
);

export default App
