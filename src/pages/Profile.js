import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/UserContext';

const Profile = () => {
    const {user} = useContext(AuthContext)
    return (
    <div className="container mx-auto my-60">
        <div>

            <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto">
                <div className="flex justify-center">
                        <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110"/>
                </div>
                
                <div className="mt-16">
                    <h1 className="font-bold text-center text-3xl text-gray-900">{user?.displayName}</h1>
                    <div className="flex justify-between items-center my-5 px-6 py-6 gap-4">
                        <Link
                        to='/products'
                        className="text-white hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full bg-green-600 py-3">All Products</Link>
                        <Link
                        to='/add-product'
                        className=" hover:text-gray-900 hover:bg-gray-100 rounded transition duration-150 ease-in font-medium text-sm text-center w-full bg-green-600 text-white py-3">Add Product</Link>
                    </div>
                </div>
            </div>

        </div>
    </div>
    );
};

export default Profile;