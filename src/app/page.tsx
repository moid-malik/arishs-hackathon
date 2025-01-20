import React from 'react'
import Hero from '../app/component/hero'
import { client } from '@/sanity/lib/client'

async function Home() {
  const products = await client.fetch(`*[_type == "product"]`)
  console.log('products are fisrt', products.length)
  
  return (
    <div className='w-full-2xl mx-auto'>
      <Hero products={products}/>
    </div>
  )
}

export default Home
