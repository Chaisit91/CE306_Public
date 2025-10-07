# การ Setup Cloudinary สำหรับ Upload รูปภาพ

## ขั้นตอนการตั้งค่า

### 1. สมัครบัญชี Cloudinary (ฟรี)
- ไปที่ https://cloudinary.com
- สมัครบัญชีใหม่ (ฟรี)
- เข้าสู่ Dashboard

### 2. รับค่า Configuration
จาก Dashboard ให้คัดลอกค่าเหล่านี้:
```
Cloud Name: your-cloud-name 
API Key: your-api-key  
API Secret: your-api-secret 
```

### 3. สร้าง Upload Preset
1. ไปที่ Settings > Upload
2. คลิก "Add upload preset"
3. ตั้งค่า:
   - **Preset name**: `products` (หรือชื่อที่ต้องการ)
   - **Signing Mode**: `Unsigned` 
   - **Folder**: `products` (ไม่ใส่ก็ได้)
   - **Transformation**: ตั้งค่าขนาดรูปตามต้องการ เช่น w_400,h_300,c_fill

### 4. อัปเดตไฟล์ในโปรเจค
แก้ไขไฟล์ `src/services/cloudinary.ts`:
```typescript
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload';
const UPLOAD_PRESET = 'products'; // ชื่อ preset ที่สร้างไว้
```

เปลี่ยน `YOUR_CLOUD_NAME` เป็น Cloud Name ของคุณ

### 5. ทดสอบการใช้งาน
1. รันโปรเจค: `npm run dev`
2. ไปที่หน้า "Products CRUD"
3. ลองเพิ่มสินค้าใหม่พร้อมอัพโหลดรูป

## ฟีเจอร์ที่ได้

✅ **อัพโหลดรูปไปยัง Cloudinary** - รูปจะถูกเก็บบน Cloud
✅ **เก็บข้อมูลใน localStorage** - ไม่ต้องใช้ฐานข้อมูล  
✅ **UI แบบ Card Layout** - สวยงาม ใช้งานง่าย
✅ **เพิ่ม/ลบสินค้า** - CRUD พื้นฐาน
✅ **รีเซ็ตข้อมูล** - กลับไปข้อมูลเริ่มต้น

## โครงสร้างไฟล์หลัก

```
src/
├── services/
│   ├── productService.ts     # จัดการข้อมูลสินค้า
│   └── cloudinary.ts         # อัพโหลดรูปไป Cloudinary
├── components/
│   ├── SimpleImageUpload.tsx # อัพโหลดรูปแบบง่าย
│   └── SimpleProductList.tsx # แสดงสินค้าแบบ Card
└── pages/
    └── ProductsPage.tsx      # หน้าจัดการสินค้า
```

## หมายเหตุ
- Cloudinary ฟรี: 25GB storage, 25GB bandwidth/เดือน
- รูปจะถูกเก็บถาวรบน Cloudinary
- ข้อมูลสินค้าเก็บใน localStorage (ไม่หายเมื่อปิดเบราว์เซอร์)