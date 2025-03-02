
import { Property } from "../../types/product.types";
import TableRequests from "../../components/Dashboard/TableRequests";
 
const mockData: Property[] = [
  {
    id: "1",
    title: "فيلا فاخرة في الرياض",
    status: "For Sale",
    type: "Villa",
    price: 2500000,
    description: "فيلا مساحة 600 م² تشطيب سوبر ديلوكس",
    createdAt: new Date(),
    location: {
      address: "حي السفارات، الرياض",
      city: "الرياض",
      link: "https://goo.gl/maps/example",
      images: ["https://img-4.aqarmap.com.eg/new-aqarmap-media/slider-photo-watermarked-large-webp/2310/6537d4004ee58710796084.jpg", "https://img-4.aqarmap.com.eg/new-aqarmap-media/slider-photo-watermarked-large-webp/2310/6537d4004ee58710796084.jpg"]
    },
    details: {
      beds: 5,
      baths: 4,
      rooms: 7,
      area: 600,
      floor: 2,
      verification: true
    },
    company: {
      id: "c1",
      name: "العقارية المتحدة",
      phone: "+966500000000",
      email: "info@example.com",
      avatar: "https://i.pinimg.com/736x/b9/e2/cf/b9e2cf0eb61ee715798c2c380c721e45.jpg"
    }
  },
  {
    id: "2",
    title: "شقة تمليك في جدة",
    status: "Sold",
    type: "Apartment",
    price: 850000,
    description: "شقة 3 غرف بمنطقة حيوية",
    createdAt: new Date(),
    location: {
      address: "حي الصفا، جدة",
      city: "جدة",
      images: ["img3.jpg"]
    },
    details: {
      beds: 3,
      baths: 2,
      rooms: 4,
      area: 180
    },
    company: {
      id: "c2",
      name: "شركة البحر الأحمر",
      phone: "+966550000000",
      email: "contact@example.com"
    }
  }
];


const PurchaseRequests = () => {
  return (
    <div className="space-y-6 p-6  min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">طلبات الشراء</h2>
      </div>

      <TableRequests data={mockData} />
    </div>
  )
}

export default PurchaseRequests