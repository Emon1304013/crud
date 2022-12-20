import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { AuthContext } from "../contexts/UserContext";

const SingleProduct = ({ product, i, refetch,isLoading }) => {
  const {loading} = useContext(AuthContext); 
  const { productName, price, _id} = product;

  const handleDeleteProduct = id => {
    fetch(`${process.env.REACT_APP_API_URL}/product/${id}`,{
        method:"DELETE",
        headers:{
            'content-type':'application/json',
        }
    }).then(res => res.json()).then(data =>{
        console.log(data);
        if(data.success){
            refetch();
            toast.success("Product Deleted Successfully")
        }
        else{
            toast.error("Deletion not possible right now. Please try again later! ")
        }
    })
    .catch(err=>{
        toast.error("Something Went wrong");
    })
  }

  if(loading && isLoading){
    <Spinner></Spinner>
  }
  return (
    <tr className="text-center">
      <th className="border border-slate-300">{i + 1}</th>
      <td className="border border-slate-300">{productName}</td>
      <td className="border border-slate-300">{price}</td>
    
      <td className="border border-slate-300">
        <Link
        to={`/product/edit/${_id}`}
        >
        <button
          className="bg-green-700 text-white py-2 px-6 rounded my-3"
        >
          Edit
        </button>
        </Link>
      </td>
      <td className="border border-slate-300">
        <button
          onClick={() => handleDeleteProduct(_id)}
          className="bg-red-700 text-white py-2 px-4 rounded my-3"
        >
          DELETE
        </button>
      </td>
    </tr>
  );
};

export default SingleProduct;
