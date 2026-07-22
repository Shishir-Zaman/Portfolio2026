import { getBrandLogos } from "../../../../lib/db";
import BrandsClient from "./BrandsClient";

export const metadata = {
  title: "Manage Brand Logos | Admin Dashboard",
};

export default async function BrandsPage() {
  const logos = await getBrandLogos();
  return <BrandsClient initialLogos={logos} />;
}
