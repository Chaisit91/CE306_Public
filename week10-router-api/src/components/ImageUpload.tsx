// นำเข้า React hooks และ service สำหรับอัพโหลดรูป
import { useState } from 'react';
import { uploadImageToCloudinary } from '../services/cloudinary';

// กำหนดประเภทของ props ที่ component จะรับ
interface ImageUploadProps {
  currentImage?: string; // URL รูปปัจจุบัน (ถ้ามี)
  onImageUploaded: (imageUrl: string) => void; // callback เมื่ออัพโหลดเสร็จ
}

export default function ImageUpload({ currentImage, onImageUploaded }: ImageUploadProps) {
  // State สำหรับติดตามสถานะการอัพโหลด
  const [uploading, setUploading] = useState(false);

  // ฟังก์ชันจัดการเมื่อผู้ใช้เลือกไฟล์
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ตรวจสอบว่าเป็นไฟล์รูปภาพหรือไม่
    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
      return;
    }

    // เริ่มสถานะการอัพโหลด
    setUploading(true);

    try {
      // อัพโหลดไฟล์ไปยัง Cloudinary
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        // ส่ง URL กลับไปยัง parent component
        onImageUploaded(imageUrl);
      } else {
        alert('อัพโหลดรูปไม่สำเร็จ');
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการอัพโหลด');
    } finally {
      // จบสถานะการอัพโหลด
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* พื้นที่อัพโหลดรูป - ใช้ label เพื่อให้คลิกได้ */}
      <label className="block">
        {/* Input file ที่ซ่อนไว้ */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
        />
        {/* พื้นที่แสดงผลและรับการคลิก */}
        <div className={`cursor-pointer border-2 border-dashed rounded-lg p-4 text-center ${
          uploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}>
          {/* แสดงรูปปัจจุบันถ้ามี */}
          {currentImage ? (
            <div className="space-y-2">
              <img src={currentImage} alt="Product" className="w-20 h-16 object-cover mx-auto rounded" />
              <p className="text-sm text-blue-600">คลิกเพื่อเปลี่ยนรูป</p>
            </div>
          ) : (
            /* แสดงไอคอนและข้อความเมื่อยังไม่มีรูป */
            <div className="py-4">
              {/* ไอคอนเครื่องหมายบวก */}
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {/* ข้อความแจ้งสถานะ */}
              <p className="mt-2 text-sm text-gray-600">
                {uploading ? 'กำลังอัพโหลด...' : 'คลิกเพื่อเลือกรูป'}
              </p>
            </div>
          )}
        </div>
      </label>
    </div>
  );
}