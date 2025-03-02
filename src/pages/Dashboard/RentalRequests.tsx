
import { Property } from "../../types/product.types";
import TableRequests from "../../components/Dashboard/TableRequests";
 
const mockData: Property[] = [
  {
    id: "1",
    title: "شقة للإيجار في الرياض",
    status: "For Rent", 
    type: "Apartment",
    price: 5000, 
    description: "شقة 3 غرف تشطيب فاخر",
    createdAt: new Date(),
    location: {
      address: "حي الملقا، الرياض",
      city: "الرياض",
      link: "https://goo.gl/maps/example",
      images: ["https://example.com/image1.jpg"]
    },
    details: {
      beds: 3,
      baths: 2,
      rooms: 3,
      area: 180,
      floor: 5,
      verification: true
    },
    company: {
      id: "c1",
      name: "شركة إيجل للإيجار",
      phone: "+966500000000",
      email: "rent@example.com",
      avatar: "https://i.pinimg.com/736x/00/d2/ef/00d2ef30c2c2da3d30d2fa40dd47f095.jpg"
    }
  },
  {
    id: "2",
    title: "فيلا مفروشة بالكامل",
    status: "Rented", 
    type: "Villa",
    price: 15000,
    description: "فيلا فاخرة مع مسبح خاص",
    createdAt: new Date(),
    location: {
      address: "حي الياسمين، جدة",
      city: "جدة",
      images: ["https://example.com/image2.jpg"]
    },
    details: {
      beds: 5,
      baths: 4,
      rooms: 6,
      area: 400,
      floor: 1
    },
    company: {
      id: "c2",
      name: "الدار الذهبية للإيجار",
      phone: "+966550000000",
      email: "info@goldenhouse.com",
      avatar: "https://i.pinimg.com/736x/12/44/06/124406228b5518beab672519fbec5f71.jpg"
    }
  }
];

const RentalRequests = () => {
  return (
    <div className="space-y-6 p-6  min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">طلبات الإيجار</h2>
      </div>

      <TableRequests data={mockData} />
    </div>
  )
}

export default RentalRequests