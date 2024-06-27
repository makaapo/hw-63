import Toolbar from './component/NavBar/NavBar';
import {Route, Routes} from 'react-router-dom';
import Posts from './pages/Posts/Posts';
import React from 'react';
import NewPost from './pages/NewPost/NewPost';

const App = () => (
  <div className="container-fluid">
    <header>
      <Toolbar/>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Posts/>} />
        <Route path="/new-post" element={<NewPost />}/>
        <Route path="*" element={<h3 className="text-center fs-1">Not Found</h3>}/>
      </Routes>
    </main>
  </div>
);

export default App
