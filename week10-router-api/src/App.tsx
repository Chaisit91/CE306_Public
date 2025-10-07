import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';
import FetchAPI from './pages/FetchAPI';
import AxiosAPI from './pages/Axios';
import './App.css'

function App() {

  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white ">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products" className="ml-4">Products</Link>
        <Link to="/products-crud" className="ml-4">Products CRUD</Link>
        <Link to="/fetch-api" className="ml-4">Fetch API</Link>
        <Link to="/axios-api" className="ml-4">Axios API</Link>
      </nav>
      <main className="p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/products-crud" element={<ProductsPage />} />
          <Route path="/fetch-api" element={<FetchAPI />} />
          <Route path="/axios-api" element={<AxiosAPI />} />
        </Routes>
      </main>
    </div>
  )
}

export default App




