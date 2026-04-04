

import { getAllCategories } from "@/action/services/getAllCategories";
import { getAllMedicines } from "@/action/services/getAllServices";
import Card from "@/components/shop/Card";
import Hero from "@/components/shop/Hero";

export default async function Page() {

const {data}=await getAllMedicines()
  const categories = await getAllCategories();
    return (
        <div>
            <Hero></Hero>
              <Card medicines={data} categories={categories} />
           
        </div>
    );
}