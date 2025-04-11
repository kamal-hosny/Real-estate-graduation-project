import { useEffect, useState } from "react";
import { supabase } from "../../config/supabaseClient.ts";

interface dataP {
  id: number;
  TypeOrder: string;
  created_at: string;
  property: {
    propertyId: number;
    propertyTitle: string;
    propertyType: string;
    price: string;
    status: string;
    city: string;
    address: string;
    googleMapsLink: string;
    totalRooms: string;
    bathrooms: string;
    bedrooms: string;
    floorNumber: string;
    area: string;
    furnished: boolean;
    description: string;
    createdAt: number;
    propertyImages: string[];
    userId: string;
  };
}
export const useGetSalesOrders = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<dataP[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("SalesOrders").select("*");
    if (error) {
      console.error("حدث خطأ أثناء جلب بيانات العقارات:", error.message);
      setError("فشل في جلب بيانات العقارات.");
    } else {
      setProperties(data as dataP[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
    
    const channel = supabase
      .channel("sales-orders-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "SalesOrders" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setProperties((prev) => [...prev, payload.new as dataP]);
          } else if (payload.eventType === "UPDATE") {
            setProperties((prev) =>
              prev.map((item) =>
                item.id === payload.new.id ? (payload.new as dataP) : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            setProperties((prev) =>
              prev.filter((item) => item.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { properties, loading, error, refetch: fetchProperties };
};