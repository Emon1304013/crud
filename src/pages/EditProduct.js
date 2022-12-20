import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { AuthContext } from '../contexts/UserContext';

const EditProduct = () => {
    const { data } = useLoaderData();
    const {_id,productName,price} = data;
    const { loading,setLoading } = useContext(AuthContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const imgHostKey = process.env.REACT_APP_imgbb_key;

  const handleUpdate = (data) => {
    setLoading(true);
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);

    fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {

        console.log(imgData);
        const product = {
          productName: data.productName,
          price: data.price,
          productImage: imgData.data.url,
        };

        fetch(`${process.env.REACT_APP_API_URL}/product/${_id}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setLoading(false);
            toast.success("Product Updated Succesfully")
            navigate('/profile');
          })
          .catch((err) => {
            setLoading(false)
            toast.error("Something Went Wrong")
            console.log(err)});
      });
  };

  if (loading) {
    <Spinner></Spinner>;
  }
    return (
        <div>
            <form
      className="space-y-4 w-80 lg:w-96 mx-auto p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900"
      onSubmit={handleSubmit(handleUpdate)}
    >
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Product Name</span>
        </label>
        <input
          {...register("productName", { required: true })}
          type="text"
          defaultValue={productName}
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-gray-900 bg-gray-200 text-gray-900"
        />

        {errors.productName?.type === "required" && (
          <p role="alert" className="text-red-600 font-bold pt-2">
            Product Name is required
          </p>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Price</span>
        </label>
        <input
          {...register("price", { required: true })}
          type="text"
          defaultValue={price}
          className="w-full px-3 py-2 border rounded-md border-gray-300 focus:border-gray-900 bg-gray-200 text-gray-900"
        />

        {errors.price?.type === "required" && (
          <p role="alert" className="text-red-600 font-bold pt-2">
            Price is required
          </p>
        )}
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Photo</span>
        </label>
        <input
          {...register("img", { required: true })}
          type="file"
          className="input w-full"
          required
        />
        {errors.img?.type === "required" && (
          <p role="alert" className="text-red-600 font-bold pt-2">
            Image is required
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-8 py-3 font-semibold rounded-md bg-green-600 hover:bg-gray-700 hover:text-white text-gray-100"
      >
        {loading ? 'Updating Product...':'Update Product'}
      </button>
    </form>
        </div>
    );
};

export default EditProduct;