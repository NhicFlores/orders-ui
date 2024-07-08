import React from "react";
import ProductHeader from "@/components/product-components/product-header";
import { NewOrderNameRoute, ShapeRoute } from "@/routes";
import ProductFooter from "@/components/product-components/product-footer";
import GlassTypeGrid from "./glass-type-grid";

const GlassTypePage = () => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  console.log("Glass Type Page Rendered");
  console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
  //pass specification string as a prop
  // if specification string has certain values
  // set render array = to corresponding options array
  // all options will be displayed using general product card
  // name - image - description
  // in the background, summary is getting the price
  // this could all be done on a single page with one component
  // if the render array is being monitored by state


  // useEffect(() => {
  //   fetchGlassTypes();
  // }, [])

  // const fetchGlassTypes = async () => {
  //   const res = await fetch('http://localhost:3000/api/glass-types')
  //   const data = await res.json()
  //   console.log(data)
  // }

  return (
    <div className="container p-4 space-y-4">
      <ProductHeader
        title="Glass Type"
        backRoute={NewOrderNameRoute.href}
        continueRoute={ShapeRoute.href}
      />
      <GlassTypeGrid />
      <ProductFooter />
    </div>
  );
};

export default GlassTypePage;
