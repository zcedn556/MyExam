import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { useState,} from "react";
import NoPage from "./components/NoPage";
import FilmList from "./components/FilmList";
import Home from "./components/Home";
import './index.css';
import CreateSession from "./components/CreateSession";
import AddFilm from './components/NewFilm';
import EditFilm from './components/EditFilm';


function App(){
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="Films" element={<FilmList/>}/>
        <Route path="*" element={<NoPage/>}/>
        <Route path="create-session" element={<CreateSession />} />
        <Route path="/add" element={<AddFilm />} />
        <Route path="/edit/:id" element={<EditFilm />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;