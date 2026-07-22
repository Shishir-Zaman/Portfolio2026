import HomeClient from "./HomeClient";
import { getCategories, getProjects, getSiteSettings, getHomePageSettings, getPersonalInfo, getServices } from "../../lib/db";

export default async function HomePage() {
  const categories = await getCategories();
  const projects = await getProjects();
  const siteSettings = await getSiteSettings();
  const homeSettings = await getHomePageSettings();
  const personalInfo = await getPersonalInfo();
  const services = await getServices();
  
  return (
    <HomeClient 
      categories={categories} 
      projects={projects} 
      siteSettings={siteSettings} 
      homeSettings={homeSettings}
      personalInfo={personalInfo}
      services={services}
    />
  );
}
