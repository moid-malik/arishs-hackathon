import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import axios from "axios";

const client = createClient({
    projectId: '7zqz0elu',
    dataset: 'production',
    apiVersion: '2025-01-19',
    token: 'skoMBj98jfmP4U6Q9MlPvgPzBtQxYusfv1vCFfSrclXvuXoTk2nbw71gPcPiwSixRwvRmfZb2i4TqgkR1er6IdfnJoWB80WOZIHHBy5AsqDrT2L4SNG9PjMuZgHHH4ImD7DrGaZ33rdQ1bM3ttNCbmtVfHDVIpHspb4qz8qOhQBuoSyaqUdO',
    useCdn: false
  })

export async function GET() {
  try {
    const { data } = await axios.get(
      "https://template-0-beta.vercel.app/api/product"
    );
    console.log("API Data received:", data);

    for (const product of data) {
      const result = await client.create({
        _type: "product",
        id: product.id,
        name: product.name,
        imagePath: product.imagePath,
        price: parseFloat(product.price),
        description: product.description,
        discountPercentage: product.discountPercentage,
        isFeaturedProduct: product.isFeaturedProduct,
        stockLevel: product.stockLevel,
        category: product.category,
      });
      console.log("Inserted product:", result);
    }

    return NextResponse.json({ message: "Data inserted successfully!" });
  } catch (error: any) {
    console.error("Detailed error:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error: "Failed to fetch or insert data",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
