import { getPersonalInfo, getServices } from "../../../lib/db";
import ContactClient from "./ContactClient";

export default async function ContactPage() {
  const personalInfo = await getPersonalInfo();
  const services = await getServices();
  
  return <ContactClient personalInfo={personalInfo} services={services} />;
}
