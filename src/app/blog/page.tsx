import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavigationBar from '../component/header';
import { FaCalendar, FaUser } from 'react-icons/fa6';
import { GiCharm } from 'react-icons/gi';
import Pagination from '../component/page';
import InputField from '../component/field';

function BlogPage() {
    return (
        <div className="container mx-auto max-w-screen-2xl pb-8 px-4">
            {/* Navigation Bar */}
            <div className="bg-[#faf4f4]">
                <NavigationBar />
            </div>

            {/* Banner Section */}
            <section className="relative text-black">
                <Image
                    src="/Rectangle 1 (1).png" // Update to correct image path
                    alt="Blog Banner"
                    height={400}
                    width={600}
                    className="w-full h-[200px] md:h-auto object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h1 className="text-xl md:text-5xl font-bold">Blog</h1>
                    <nav className="mt-4 text-gray-700 text-xs md:text-xl flex items-center">
                        <Link href="/" className="font-bold hover:underline">
                            Home
                        </Link>
                        <span className="mx-2 font-bold">{'>'}</span>
                        <Link href="/blog" className="hover:underline">
                            Blog
                        </Link>
                    </nav>
                </div>
            </section>

            <div className="flex flex-col lg:flex-row">
                {/* Blog Content */}
                <main className="mt-8 w-full lg:w-3/4 gap-6">
                    {/* Blog Posts */}
                    {[
                        { image: "/Rectangle 13.png", title: "Embracing Millennial Design", category: "Crafts", date: "01 Jan 2023" },
                        { image: "/Rectangle 14.png", title: "Innovative Decoration Styles", category: "Design", date: "15 Mar 2023" },
                        { image: "/Rectangle 15.png", title: "Time-Consuming Handmade Art", category: "Wood", date: "20 Sep 2023" },
                    ].map((post, index) => (
                        <article key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                            <Image
                                src={post.image}
                                height={300}
                                width={500}
                                alt={post.title}
                                className="rounded-t-lg"
                            />
                            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                    <FaUser />
                                    <p>Admin</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <FaCalendar />
                                    <p>{post.date}</p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <GiCharm />
                                    <p>{post.category}</p>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold mt-4">{post.title}</h2>
                            <p className="mt-2 text-gray-700 line-clamp-4">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex amet minima molestias.
                            </p>
                            <Link
                                href={`/blog/${index + 1}`}
                                className="mt-4 block text-primary underline underline-offset-4"
                            >
                                Read More
                            </Link>
                        </article>
                    ))}
                </main>

                {/* Sidebar */}
                <aside className="mt-10 w-full lg:w-1/4 p-6 gap-6">
                    {/* Categories */}
                    <section className="p-6 rounded-lg bg-gray-100">
                        <h3 className="text-xl font-bold mb-4">Categories</h3>
                        <ul className="space-y-2 text-gray-500">
                            {[
                                { name: 'Crafts', count: 2 },
                                { name: 'Design', count: 8 },
                                { name: 'Handmade', count: 7 },
                                { name: 'Interior', count: 1 },
                                { name: 'Wood', count: 6 },
                            ].map((category, index) => (
                                <li key={index} className="flex justify-between text-sm">
                                    <span>{category.name}</span>
                                    <span>{category.count}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Recent Posts */}
                    <section className="p-6 rounded-lg bg-gray-100">
                        <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
                        <div className="space-y-6">
                            {[
                                { image: '/Rectangle 69 (1).png', title: 'Embracing Millennial Design', date: '03 Aug 2022' },
                                { image: '/Rectangle 69 (2).png', title: 'Innovative Decoration Styles', date: '03 Aug 2022' },
                                { image: '/Rectangle 69 (3).png', title: 'Handmade Art', date: '03 Aug 2022' },
                                { image: '/Rectangle 69 (4).png', title: 'Modern Milan Home', date: '03 Aug 2022' },
                                { image: '/Rectangle 15.png', title: 'Office Redesign', date: '03 Aug 2022' },
                            ].map((post, index) => (
                                <div key={index} className="flex space-x-3">
                                    <Image src={post.image} height={100} width={100} alt="" />
                                    <div>
                                        <h4 className="text-lg font-semibold">{post.title}</h4>
                                        <p>{post.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>

            {/* Footer */}
            <footer className="justify-center mx-auto text-center">
                <Pagination />
                <InputField />
            </footer>
        </div>
    );
}

export default BlogPage;