import { getAllCategories } from "@/action/services/getAllCategories";
import { getAllServices } from "@/action/services/getAllServices";
import Card from "@/components/shop/Card";
import Hero from "@/components/shop/Hero";

export default async function Page() {
  const servicesRes = await getAllServices();
  const categories = await getAllCategories();
 console.log("text",servicesRes);
  // make sure we pass the array of services, not the whole response object
  const services = servicesRes?.data || [];

  return (
    <div>
      <Hero />
      <Card services={services} categories={categories} />
    </div>
  );
}