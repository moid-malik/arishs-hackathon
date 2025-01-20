import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
  id: string;
  imageUrl: string;
  title: string;
  price: string;
}

const Card= ({ id, imageUrl, title, price }:CardProps) => {
  return (
    <Link href={`/product/${id}`}>
      <div className="max-w-xs p-4 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow">
        <div className="flex justify-center gap-4 h-[300px]">
          <Image 
            src={imageUrl} 
            alt={title} 
            width={500} 
            height={300} 
            className="rounded-md object-cover"
          />
        </div>
        <h3 className="mt-4 text-lg text-center text-gray-800 mb-4">
          {title}
        </h3>
        <p className="mt-6 text-center text-lg font-semibold text-gray-900">
          {price}
        </p>
      </div>
    </Link>
  );
