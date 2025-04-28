import { useEffect, useState } from "react";
import { supabase } from "../../config/supabaseClient.ts";

interface Property {
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
}

interface SalesOrder {
  id: number;
  TypeOrder: string;
  created_at: string;
  property: Property;
}

export const useGetSalesOrders = () => {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<SalesOrder[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("SalesOrders").select("*");
    if (error) {
      console.error("حدث خطأ أثناء جلب بيانات العقارات:", error.message);
      setError("فشل في جلب بيانات العقارات.");
    } else {
      setProperties(data as SalesOrder[]);
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
          switch (payload.eventType) {
            case "INSERT":
              setProperties((prev) => [...prev, payload.new as SalesOrder]);
              break;
            case "UPDATE":
              setProperties((prev) =>
                prev.map((item) =>
                  item.id === payload.new.id ? (payload.new as SalesOrder) : item
                )
              );
              break;
            case "DELETE":
              setProperties((prev) =>
                prev.filter((item) => item.id !== payload.old.id)
              );
              break;
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