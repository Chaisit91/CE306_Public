import { useState, useEffect } from 'react';
import type { Product } from '../services/productService';
import { 
  getAllProducts, 
  createProduct, 
  deleteProduct,
  resetProducts 
} from '../services/productService';
import ImageUpload from './ImageUpload';

export default function ProductList() {
  // State สำหรับเก็บรายการสินค้าทั้งหมด
  const [products, setProducts] = useState<Product[]>([]);
  // State สำหรับข้อมูลสินค้าใหม่ที่กำลังเพิ่ม
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, image: '' });

  // โหลดข้อมูลสินค้าเมื่อ component แรกเริ่ม
  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

  // ฟังก์ชันเพิ่มสินค้าใหม่
  const handleAddProduct = () => {
    // ตรวจสอบข้อมูลก่อนเพิ่ม
    if (!newProduct.name || newProduct.price <= 0) {
      alert('กรุณาใส่ชื่อสินค้าและราคา');
      return;
    }

    // เพิ่มสินค้าและอัพเดทรายการ
    createProduct(newProduct);
    setProducts(getAllProducts());
    // รีเซ็ตฟอร์มหลังเพิ่มเสร็จ
    setNewProduct({ name: '', price: 0, image: '' });
  };

  // ฟังก์ชันลบสินค้า
  const handleDeleteProduct = (id: number) => {
    if (confirm('ต้องการลบสินค้านี้หรือไม่?')) {
      deleteProduct(id);
      setProducts(getAllProducts()); // อัพเดทรายการหลังลบ
    }
  };

  // ฟังก์ชันรีเซ็ตข้อมูลทั้งหมด
  const handleReset = () => {
    if (confirm('ต้องการรีเซ็ตข้อมูลหรือไม่?')) {
      resetProducts();
      setProducts(getAllProducts()); // โหลดข้อมูลใหม่
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* ส่วนหัวของหน้า - มีชื่อหน้าและปุ่มรีเซ็ต */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">จัดการสินค้า</h1>
        <button 
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          รีเซ็ตข้อมูล
        </button>
      </div>

      {/* ฟอร์มเพิ่มสินค้าใหม่ */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">เพิ่มสินค้าใหม่</h2>
        {/* แถวของฟิลด์ input - แบ่งเป็น 3 คอลัมน์บนหน้าจอใหญ่ */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* ฟิลด์ชื่อสินค้า */}
          <div>
            <label className="block text-sm font-medium mb-2">ชื่อสินค้า</label>
            <input
              type="text"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full border p-3 rounded"
              placeholder="ใส่ชื่อสินค้า"
            />
          </div>
          {/* ฟิลด์ราคา */}
          <div>
            <label className="block text-sm font-medium mb-2">ราคา (บาท)</label>
            <input
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
              className="w-full border p-3 rounded"
              placeholder="ใส่ราคา"
            />
          </div>
          {/* ฟิลด์อัพโหลดรูปภาพ */}
          <div>
            <label className="block text-sm font-medium mb-2">รูปสินค้า</label>
            <ImageUpload 
              currentImage={newProduct.image}
              onImageUploaded={(url) => setNewProduct({ ...newProduct, image: url })}
            />
          </div>
        </div>
        {/* ปุ่มเพิ่มสินค้า */}
        <button 
          onClick={handleAddProduct}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          เพิ่มสินค้า
        </button>
      </div>

      {/* ส่วนแสดงรายการสินค้าในรูปแบบ Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* วนลูปแสดงสินค้าแต่ละตัว */}
        {products.map(product => (
          <div key={product.id} className="border rounded-lg p-4 bg-white shadow">
            {/* พื้นที่แสดงรูปสินค้า */}
            <div className="aspect-video bg-gray-100 rounded mb-3 overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                // แสดงเมื่อไม่มีรูป
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  ไม่มีรูป
                </div>
              )}
            </div>
            
            {/* ข้อมูลสินค้า */}
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-xl text-blue-600 font-bold mb-3">
              ฿{product.price.toLocaleString()}
            </p>
            
            {/* ปุ่มลบสินค้า */}
            <button
              onClick={() => handleDeleteProduct(product.id)}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              ลบสินค้า
            </button>
          </div>
        ))}
      </div>

      {/* ส่วนแสดงเมื่อไม่มีสินค้า (Empty State) */}
      {products.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {/* ไอคอนกล่อง */}
          <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          {/* ข้อความแจ้งเมื่อไม่มีสินค้า */}
          <p className="text-lg">ยังไม่มีสินค้า</p>
          <p className="text-sm">เริ่มต้นเพิ่มสินค้าแรกของคุณ</p>
        </div>
      )}
    </div>
  );
}