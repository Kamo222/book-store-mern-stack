
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./Pages/Home";
import CreateBook from "./Pages/CreateBook"
import DeleteBook from "./Pages/DeleteBook"
import ShowBook from  "./Pages/ShowBook"
import EditBook from "./Pages/EditBook"

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="books/create" element={<CreateBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
      </Routes>
    </div>
  )
}

export default App
