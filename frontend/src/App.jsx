import { useState } from 'react'
import { createBrowserRouter , RouterProvider} from "react-router-dom"
import PaymentPage from './pages/payment/payment'
import ProductListingPage from './pages/products/productPage'

function App() {

  const router = createBrowserRouter([
    {
      path:"/product/:productId",
      element : <PaymentPage />
    },
    {
      path:"/",
      element:<ProductListingPage />
    }
  ])

  return (
    <>
       <RouterProvider router={router}/>
    </>
  )
}

export default App
