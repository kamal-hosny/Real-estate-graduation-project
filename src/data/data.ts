import { TProductResponse } from "../types";

export const sampleProperties: TProductResponse = {
    data: {
      data: [
        {
          id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
          title: "فيلا فاخرة بحي السفارات",
          status: "For Sale",
          type: "Villa",
          price: 4500000,
          description: "فيلا فاخرة مساحة 600 م² تشطيب سوبر ديلوكس",
          createdAt: new Date("2024-03-01"),
          location: {
            address: "حي السفارات، الرياض 12345",
            city: "الرياض",
            link: "https://maps.app.goo.gl/t798WfdfsceNDLPd6",
            images: [
              "https://images.bayut.eg/thumbnails/25399752-800x600.webp",
              "https://images.bayut.eg/thumbnails/25399753-800x600.webp"
            ]
          },
          details: {
            beds: 5,
            baths: 4,
            rooms: 7,
            area: 600,
            verification: true
          },
          company: {
            id: "comp-123",
            name: "العقارية الذهبية",
            phone: "+966500000001",
            email: "info@golden-estate.com",
            avatar: `https://i.pinimg.com/236x/2b/d5/bd/2bd5bd98892c79ad3f1336571dc46227.jpg`
          }
        },
        {
          id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
          title: "شقة راقية بالطابق العاشر",
          status: "For Rent",
          type: "Apartment",
          price: 80000,
          description: "شقة 3 غرف تشطيب حديث بمساحة 180 م²",
          createdAt: new Date("2024-02-15"),
          location: {
            address: "حي المروج، جدة 67890",
            city: "جدة",
            link: "https://maps.app.goo.gl/R5jSSZvRERhsXMqu6",
            images: [
              "https://images.bayut.eg/thumbnails/25399754-800x600.webp",
              "https://images.bayut.eg/thumbnails/25399755-800x600.webp"
            ]
          },
          details: {
            beds: 3,
            baths: 2,
            rooms: 4,
            area: 180,
            floor: 10,
            verification: true
          },
          company: {
            id: "comp-456",
            name: "بيوت المستقبل",
            phone: "+966500000002",
            email: "contact@future-homes.com",
            avatar: `https://i.pinimg.com/236x/2b/d5/bd/2bd5bd98892c79ad3f1336571dc46227.jpg`
          }
        },
        {
          id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
          title: "محل تجاري بموقع مميز",
          status: "For Sale",
          type: "Shop",
          price: 1200000,
          description: "محل تجاري بمساحة 80 م² بموقع استراتيجي",
          createdAt: new Date("2024-01-20"),
          location: {
            address: "شارع الملك فهد، الدمام 34567",
            city: "الدمام",
            images: [
              "https://images.bayut.eg/thumbnails/25399756-800x600.webp",
              "https://images.bayut.eg/thumbnails/25399758-800x600.webp"
            ]
          },
          details: {
            beds: 0,
            baths: 1,
            rooms: 1,
            area: 80
          },
          company: {
            id: "comp-789",
            name: "العقار المضمون",
            phone: "+966500000003",
            email: "sales@trusted-estate.com",
            avatar: `https://i.pinimg.com/236x/2b/d5/bd/2bd5bd98892c79ad3f1336571dc46227.jpg`
          }
        },
        {
          id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
          title: "تاون هاوس عائلي",
          status: "Sold",
          type: "Townhouse",
          price: 1850000,
          description: "تاون هاوس 4 غرف مساحة 280 م²",
          createdAt: new Date("2023-12-05"),
          location: {
            address: "حي الربيع، الخبر 89101",
            city: "الخبر",
            images: [
              "https://images.bayut.eg/thumbnails/25399759-800x600.webp",
              "https://images.bayut.eg/thumbnails/25399760-800x600.webp"
            ]
          },
          details: {
            beds: 4,
            baths: 3,
            rooms: 5,
            area: 280,
            verification: false
          },
          company: {
            id: "comp-101",
            name: "دارك العقارية",
            phone: "+966500000004",
            email: "info@darak.com",
            avatar: `https://i.pinimg.com/236x/2b/d5/bd/2bd5bd98892c79ad3f1336571dc46227.jpg`
          }
        },
        {
          id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
          title: "مكتب إداري فاخر",
          status: "For Rent",
          type: "Office",
          price: 45000,
          description: "مكتب إداري بمساحة 120 م² بتشطيب ممتاز",
          createdAt: new Date("2024-03-10"),
          location: {
            address: "حي العليا، الرياض 11223",
            city: "الرياض",
            link: "https://maps.app.goo.gl/6qSHwpuwsWHgne3Y9",
            images: [
              "https://images.bayut.eg/thumbnails/25399761-800x600.webp",
              "https://images.bayut.eg/thumbnails/25399762-800x600.webp"
            ]
          },
          details: {
            beds: 0,
            baths: 2,
            rooms: 3,
            area: 120,
            floor: 15
          },
          company: {
            id: "comp-112",
            name: "مكاتب السعودية",
            phone: "+966500000005",
            email: "rent@saudi-offices.com"
          }
        },
        {
          id: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
          title: "منزل خاص مع حديقة",
          status: "Rented",
          type: "Private House",
          price: 300000,
          description: "منزل خاص مع حديقة مساحة 400 م²",
          createdAt: new Date("2024-02-01"),
          location: {
            address: "حي النخيل، الطائف 44556",
            city: "الطائف",
            images: [
            ]
          },
          details: {
            beds: 6,
            baths: 4,
            rooms: 8,
            area: 400,
            verification: true
          },
          company: {
            id: "comp-131",
            name: "المنازل الذكية",
            phone: "+966500000006",
            email: "info@smart-homes.com",
            avatar: `https://i.pinimg.com/236x/2b/d5/bd/2bd5bd98892c79ad3f1336571dc46227.jpg`
          }
        }
      ]
    },
    meta: {
      page: 1,
      limit: 10,
      last_page: 1
    }
  };