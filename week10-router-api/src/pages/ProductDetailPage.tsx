import { useParams, Link } from "react-router-dom";

export default function ProductDetailPage() {
    const { productId } = useParams<{ productId: string }>(); // productId จะมีค่าตรงกับที่ระบุใน URL
    // ตอนนี้เราสามารถนำ productId ไปใช้ดึงข้อมูลสินค้าชิ้นนั้นๆ ต่อไปได้
    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Product Detail</h1>
            <p className="mb-4">Showing details for product ID: <span className="font-semibold">{productId}</span></p>
            <Link to="/products" className="text-blue-600 hover:underline">
                ← Back to Product List
            </Link>
        </div>
    );
}

