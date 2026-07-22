import { getServices } from "../../../lib/db";
import ServicesClient from "./ServicesClient";

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesClient services={services} />;
}
