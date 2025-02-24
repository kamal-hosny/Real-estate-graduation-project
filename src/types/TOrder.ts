
export type TOrder = {
  "RFQ Date": string | Date;
  Customer: string;
  status: string;
  OG_Invoice: string;
  Customer_PO: string;
  Payment_Date: string;
  Payment_AED: number; 
  Payment_Reference: string;
  Shipping_status: string;
  DN: string;
  Comments: string;
  cart: any[];
};