import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Hello from './Components/Hello/Hello'
import About from './Components/AboutMe/AboutMe'
import Contacts from './Components/Contacts/Contacts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Hello/>
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'contact',
        element: <Contacts />
      }
    ]
  },
  {
    path: '*',
    element: <div style={{ padding: '2rem' }}>Ошибка 404: Страница не найдена</div>
  }
])

export default router
