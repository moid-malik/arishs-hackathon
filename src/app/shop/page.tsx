import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../component/header";
import ShopLine from "../component/shopLine";
import Field from "../component/field";
import { client } from "@/sanity/lib/client";
import Page from "../component/page";
import { urlFor } from "@/sanity/lib/image";

// const item = [
//   {
//     id: 1,
//     src: "/Mask group (2).png",
//     name: "Trenton modular sofa_3",
//     price: "Rs. 25,000.00",
//     href: "/hero/3",
//   },
//   {
//     id: 1,
//     src: "/Mask group (3).png",
//     name: "Granite dining table with dining chair",
//     price: "Rs. 25,000.00",
//     href: "/hero/4",
//   },
//   {
//     id: 1,
//     src: "/Mask group (4).png",
//     name: "Outdoor bar table and stool",
//     price: "Rs. 25,000.00",
//     href: "/hero/5",
//   },
//   {
//     id: 1,
//     src: "/Mask group (5).png",
//     name: "Plain console with teak",
//     price: "Rs. 25,000.00",
//     href: "/hero/6",
//   },
//   {
//     id: 1,
//     src: "/Mask group (6).png",
//     name: "Trenton modular sofa_3",
//     price: "Rs. 25,000.00",
//     href: "/shop/5",
//   },
//   {
//     id: 1,
//     src: "/Mask group (7).png",
//     name: "Granite dining table with dining chair",
//     price: "Rs. 25,000.00",
//     href: "/shop/6",
//   },
//   {
//     id: 1,
//     src: "/Mask group (8).png",
//     name: "Outdoor bar table and stool",
//     price: "Rs. 25,000.00",
//     href: "/shop/7",
//   },
//   {
//     id: 1,
//     src: "/Mask group (9).png",
//     name: "Plain console with teak",
//     price: "Rs. 25,000.00",
//     href: "/shop/8",
//   },
//   {
//     id: 1,
//     src: "/Mask group (10).png",
//     name: "Trenton modular sofa_3",
//     price: "Rs. 25,000.00",
//     href: "/shop/9",
//   },
//   {
//     id: 1,
//     src: "/Mask group (11).png",
//     name: "Granite dining table with dining chair",
//     price: "Rs. 25,000.00",
//     href: "/shop/10",
//   },
//   {
//     id: 1,
//     src: "/Mask group (12).png",
//     name: "Outdoor bar table and stool",
//     price: "Rs. 25,000.00",
//     href: "/shop/11",
//   },
//   {
//     id: 1,
//     src: "/Mask group (13).png",
//     name: "Plain console with teak",
//     price: "Rs. 25,000.00",
//     href: "/shop/12",
//   },
//   {
//     id: 1,
//     src: "/Mask group (14).png",
//     name: "Trenton modular sofa_3",
//     price: "Rs. 25,000.00",
//     href: "/shop/13",
//   },
//   {
//     id: 1,
//     src: "/Mask group (15).png",
//     name: "Granite dining table with dining chair",
//     price: "Rs. 25,000.00",
//     href: "/shop/14",
//   },
//   {
//     id: 1,
//     src: "/Mask group (16).png",
//     name: "Outdoor bar table and stool",
//     price: "Rs. 25,000.00",
//     href: "/shop/15",
//   },
//   {
//     id: 1,
//     src: "/Mask group (17).png",
//     name: "Plain console with teak",
//     price: "Rs. 25,000.00",
//     href: "/shop/16",
//   },
// ];

async function getProducts() {
  const query = `*[_type == "product"]`;
  return await client.fetch(query);
}
async function Shop() {
  const products = await getProducts();
  return (
    <div className="max-w-screen-2xl container mx-auto pb-8 px-4">
      <div className="bg-[#faf4f4]">
        <Header />
      </div>
      {/* Banner Section */}
      <div className="relative text-black">
        <Image
          src="/Rectangle 1 (1).png" // Replace with the correct image file path
          alt="Shop Banner"
          height={400}
          width={1600}
          className="w-full h-40 md:h-auto object-cover"
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl md:text-5xl font-semibold ">
          Shop
        </h1>
        {/* Breadcrumb Section */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-14">
          <p className="text-gray-700 text-xs md:text-xl flex items-center">
            <Link href="/" className="font-bold hover:underline">
              Home
            </Link>
            <span className="font-bold mx-2">{">"}</span>
            <Link href="/shop" className=" hover:underline">
              Shop
            </Link>
          </p>
        </div>
      </div>

      <div className="my-6">
        <ShopLine />
      </div>

      <div>
        {/* Product List */}
        <div className="flex flex-wrap justify-center md:justify-start  gap-6 ">
          {/* Product Item */}
          {products.map((product: any) => (
            <Link href={`/product/${product.id}`} key={product._id}>
            <div
              className="flex flex-col text-left mx-auto h-[300px] w-[350px]">
              <Image
                src={product.imagePath}
                alt={product.name}
                height={300}
                width={350}
                className="rounded-lg h-[300px] w-[300px] object-cover"
              />
              <p className="text-sm font-medium">{product.name}</p>
              <h3 className="text-xl font-semibold">
                Rs. {product.price.toFixed(2)}
              </h3>
            </div>
            </Link>
          ))}

          <div className="justify-center mx-auto">
            <Page />
          </div>
        </div>
      </div>

      <Field />
    </div>
  );
}

export default Shop;
