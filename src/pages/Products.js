import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AuthContext } from "../contexts/UserContext";

import SingleProduct from "./SingleProduct";

const Products = () => {
  const {loading } = useContext(AuthContext);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      return data.data;
    },
  });
  if(isLoading && loading){
    <Spinner></Spinner>
  }
  return (
    <div>
      <h2 className="text-2xl text-center font-bold text-secondary mb-4">
        All Products
      </h2>

      {
        products?.length>0 ? <>
        <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300"></th>
              <th className="border border-slate-300">Product Name</th>
              <th className="border border-slate-300">Price</th>
              <th colSpan="2" className="border border-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, i) => (
              <SingleProduct
              key={product._id}
              i={i}
              product={product}
              refetch={refetch}
              isLoading={isLoading}
              >

              </SingleProduct>
            ))}
          </tbody>
        </table>
      </div>
      </> : <p className="text-center text-2xl">No products available.<Link to="/add-product" className="underline ml-2"> Add Some products</Link></p>
      }
    </div>
  );
};

export default Products;
