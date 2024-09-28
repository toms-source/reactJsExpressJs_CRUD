import { BrowserRouter, Routes, Route } from 'react-router-dom'
import User from './users'
import AddUser from './AddUser'
import UpdateUser from './UpdateUser'

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<User />} /> 
          <Route path='/addUser' element={<AddUser />} /> 
          <Route path='/updateUser/:id' element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
