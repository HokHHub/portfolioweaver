import {createRoot} from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
const root = createRoot(document.querySelector('#root'))
import routes from "./routes"

root.render(
    <RouterProvider router={routes}/>
)
