
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
    createdAt: new Date("2024-03-15"),
    location: {
      address: "حي السفارات، الرياض",
      city: "الرياض",
      link: "https://goo.gl/maps/example",
      images: [
        "https://example.com/villa1.jpg",
        "https://example.com/villa2.jpg"
      ]
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
      avatar: "https://i.pinimg.com/736x/a7/e3/e9/a7e3e9b8f9b09221d44c690ef965c807.jpg"
    }
  },
  {
    id: "2",
    title: "شقة تمليك في جدة",
    status: "Sold",
    type: "Apartment",
    price: 850000,
    description: "شقة 3 غرف بمنطقة حيوية",
    createdAt: new Date("2024-02-20"),
    location: {
      address: "حي الصفا، جدة",
      city: "جدة",
      images: ["https://example.com/apartment1.jpg"]
    },
    details: {
      beds: 3,
      baths: 2,
      rooms: 4,
      area: 180,
      floor: 5
    },
    company: {
      id: "c2",
      name: "شركة البحر الأحمر",
      phone: "+966550000000",
      email: "contact@example.com"
    }
  },
  {
    id: "3",
    title: "مكتب تجاري في الدمام",
    status: "For Rent",
    type: "Office",
    price: 15000,
    description: "مكتب بمساحة 80 م² بموقع مميز",
    createdAt: new Date("2024-04-01"),
    location: {
      address: "حي العقيق، الدمام",
      city: "الدمام",
      images: ["https://example.com/office1.jpg"]
    },
    details: {
      beds: 0,
      baths: 1,
      rooms: 2,
      area: 80,
      floor: 10
    },
    company: {
      id: "c3",
      name: "شركة الشرق للأعمال",
      phone: "+966530000000",
      email: "info@eastco.com"
    }
  }
];

const SalesRequests = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">طلبات البيع</h2>
    </div>

    <TableRequests data={mockData} />
  </div>
  )
}

export default SalesRequests