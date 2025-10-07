import React, { useEffect, useState } from 'react';
interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
}

const FetchAPI: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                await fetch('https://jsonplaceholder.typicode.com/users/1') // ดึงข้อมูลจาก API
                    .then(response => response.json()) // แปลงข้อมูลที่ได้ให้เป็น JSON
                    .then(data => {
                        setUser(data); // แสดงผลข้อมูลที่ได้
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error); // จัดการเมื่อเกิดข้อผิดพลาด
                    });
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <div>User not found</div>;
    }
    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">User Details</h1>
            <p className="mb-1"><strong>Name:</strong> {user.name}</p>
            <p className="mb-1"><strong>Email:</strong> {user.email}</p>
            <p className="mb-1"><strong>Phone:</strong> {user.phone}</p>
        </div>
    );
};
export default FetchAPI;

