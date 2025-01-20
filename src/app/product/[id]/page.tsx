import React from 'react';
import Link from 'next/link';
import Header from '@/app/component/header';
import Image from 'next/image';
import { BsFacebook } from 'react-icons/bs';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { client } from '@/sanity/lib/client';

async function getProduct(id: string) {
  return await client.fetch(`*[_type == "product" && id == $id][0]`, { id });
}

async function Page({ params }: { params: { id: string } }) {
    const product = await getProduct(params.id);
    const sizes = ["L", "XL", "XS"];
    const colors = ["bg-purple-700", "bg-blue-500", "bg-green-400"];

    return (
        <div className="max-w-screen-2xl bg-white container mx-auto pb-8 px-4">
            <Header />
            <nav className="text-gray-700 text-xl flex items-center space-x-2">
                <Link href="/" className="font-bold hover:underline">Home</Link>
                <span className="font-bold">{'>'}</span>
                <Link href="/shop" className="hover:underline">Shop</Link>
                <span className="font-bold">{'>'}</span>
                <span>{product.name}</span>
            </nav>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div>
                    <Image
                        src={product.imagePath}
                        alt={product.name}
                        height={500}
                        width={400}
                        className="w-full mt-4 rounded-lg"
                    />
                </div>

                <div>
                    <h3 className="text-2xl font-medium">{product.name}</h3>
                    <p className="text-xl text-gray-500">Rs: {product.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                        <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                        <span className="text-gray-700">(5 Customer Reviews)</span>
                    </div>
                    <p className="mt-4 text-gray-700">{product.description}</p>

                    <div className="mt-4">
                        <h4 className="font-semibold">Size</h4>
                        <div className="flex gap-2 mt-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    className="border rounded-md px-4 py-2 hover:bg-gray-200"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h4 className="font-semibold">Color</h4>
                        <div className="flex gap-2 mt-2">
                            {colors.map((color, idx) => (
                                <div key={idx} className={`rounded-full h-5 w-5 ${color}`}></div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6">
                        <div className="flex items-center border p-2 gap-4">
                            <button>-</button>
                            <span>1</span>
                            <button>+</button>
                        </div>
                        <button className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90">
                            Add To Cart
                        </button>
                    </div>

                    <hr className="my-6" />

                    <div>
                        <div className="flex justify-between">
                            <span>SKU:</span>
                            <span>{product.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Category:</span>
                            <span>{product.category}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Stock Level:</span>
                            <span>{product.stockLevel}</span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span>Share:</span>
                            <div className="flex space-x-2">
                                <BsFacebook className="text-blue-600 cursor-pointer" />
                                <FaLinkedin className="text-blue-700 cursor-pointer" />
                                <FaTwitter className="text-blue-400 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;
