**Step-by-Step Guide to Use Sanity.io with an API**

**Prerequisites:**

* **Node.js installed on your machine.**

* **Basic knowledge of Next.js and Sanity.io.**

* **Access to the API: https://template-0-beta.vercel.app/api/product.**

---

**Step 1: Set Up Sanity.io**

1. **Install the Sanity CLI:**

2. **npm install \-g @sanity/cli**

3. **Create a New Sanity Project:**

4. **sanity init**

   * **Choose "Create new project."**

   * **Provide a name for your project (e.g., Product Database).**

   * **Select a dataset (e.g., production).**

   * **Choose a schema template (e.g., E-commerce).**

5. **Navigate to the Project Folder:**

6. **cd your-sanity-project**

7. **Start the Sanity Studio:**

8. **sanity start**

**This will open the Sanity Studio in your browser.**

---

**Step 2: Define the Schema for Products**

1. **Open the schemas folder in your Sanity project.**

2. **Create a New Schema File: product.js**

3. **export default {**

4.   **name: 'product',**

5.   **title: 'Product',**

6.   **type: 'document',**

7.   **fields: \[**

8.     **{**

9.       **name: 'id',**

10.       **title: 'ID',**

11.       **type: 'string',**

12.     **},**

13.     **{**

14.       **name: 'name',**

15.       **title: 'Name',**

16.       **type: 'string',**

17.     **},**

18.     **{**

19.       **name: 'imagePath',**

20.       **title: 'Image Path',**

21.       **type: 'url',**

22.     **},**

23.     **{**

24.       **name: 'price',**

25.       **title: 'Price',**

26.       **type: 'number',**

27.     **},**

28.     **{**

29.       **name: 'description',**

30.       **title: 'Description',**

31.       **type: 'text',**

32.     **},**

33.     **{**

34.       **name: 'discountPercentage',**

35.       **title: 'Discount Percentage',**

36.       **type: 'number',**

37.     **},**

38.     **{**

39.       **name: 'isFeaturedProduct',**

40.       **title: 'Is Featured Product',**

41.       **type: 'boolean',**

42.     **},**

43.     **{**

44.       **name: 'stockLevel',**

45.       **title: 'Stock Level',**

46.       **type: 'number',**

47.     **},**

48.     **{**

49.       **name: 'category',**

50.       **title: 'Category',**

51.       **type: 'string',**

52.     **},**

53.   **\],**

54. **};**

55. **Register the Schema: Add the new schema to schema.js:**

56. **import product from './product';**

57. 

58. **export default createSchema({**

59.   **name: 'default',**

60.   **types: schemaTypes.concat(\[product\]),**

61. **});**

62. **Deploy the Schema:**

63. **sanity deploy**

---

**Step 3: Set Up Next.js Project**

1. **Create a Next.js App:**

2. **npx create-next-app@latest my-next-app**

3. **Navigate to the Project Folder:**

4. **cd my-next-app**

5. **Install Dependencies:**

6. **npm install @sanity/client axios**

---

**Step 4: Fetch Data from API and Insert into Sanity**

1. **Create a Sanity Client: Create a file sanityClient.js in your Next.js project:**

2. **import { createClient } from '@sanity/client';**

3. 

4. **const client \= createClient({**

5.   **projectId: 'your\_project\_id', // Replace with your Sanity project ID**

6.   **dataset: 'production', // Replace with your dataset name**

7.   **useCdn: false,**

8.   **token: 'your\_sanity\_token', // Replace with your Sanity API token**

9. **});**

10. 

11. **export default client;**

12. **Create an API Route to Insert Data: In pages/api/fetch-and-insert.js:**

13. **import axios from 'axios';**

14. **import client from '../../sanityClient';**

15. 

16. **export default async function handler(req, res) {**

17.   **try {**

18.     **// Fetch data from the API**

19.     **const { data } \= await axios.get('https://template-0-beta.vercel.app/api/product');**

20. 

21.     **// Insert each product into Sanity**

22.     **for (const product of data) {**

23.       **await client.create({**

24.         **\_type: 'product',**

25.         **id: product.id,**

26.         **name: product.name,**

27.         **imagePath: product.imagePath,**

28.         **price: parseFloat(product.price),**

29.         **description: product.description,**

30.         **discountPercentage: product.discountPercentage,**

31.         **isFeaturedProduct: product.isFeaturedProduct,**

32.         **stockLevel: product.stockLevel,**

33.         **category: product.category,**

34.       **});**

35.     **}**

36. 

37.     **res.status(200).json({ message: 'Data inserted successfully\!' });**

38.   **} catch (error) {**

39.     **console.error(error);**

40.     **res.status(500).json({ error: 'Failed to fetch or insert data' });**

41.   **}**

42. **}**

43. **Run the API Route: Start the development server:**

44. **npm run dev**

**Visit http://localhost:3000/api/fetch-and-insert to execute the data fetching and insertion process.**

---

**Step 5: Verify the Data**

1. **Open your Sanity Studio.**

2. **Navigate to the "Product" section and verify that the data from the API has been inserted correctly.**

---

**Step 6: Display Data in Next.js**

1. **Fetch Data from Sanity in a Page Component: In pages/index.js:**

2. **import client from '../sanityClient';**

3. 

4. **export async function getServerSideProps() {**

5.   **const products \= await client.fetch(\`\*\[\_type \== 'product'\]\`);**

6. 

7.   **return {**

8.     **props: { products },**

9.   **};**

10. **}**

11. 

12. **export default function Home({ products }) {**

13.   **return (**

14.     **\<div\>**

15.       **\<h1\>Products\</h1\>**

16.       **\<ul\>**

17.         **{products.map((product) \=\> (**

18.           **\<li key={product.\_id}\>**

19.             **\<h2\>{product.name}\</h2\>**

20.             **\<img src={product.imagePath} alt={product.name} width="200" /\>**

21.             **\<p\>{product.description}\</p\>**

22.             **\<p\>Price: ${product.price}\</p\>**

23.             **\<p\>Category: {product.category}\</p\>**

24.             **\<p\>Stock Level: {product.stockLevel}\</p\>**

25.             **\<p\>Featured: {product.isFeaturedProduct ? 'Yes' : 'No'}\</p\>**

26.           **\</li\>**

27.         **))}**

28.       **\</ul\>**

29.     **\</div\>**

30.   **);**

31. **}**

32. **Run the Next.js App:**

33. **npm run dev**

**Visit http://localhost:3000 to see the products displayed.**

---

**Congratulations\!**

**You have successfully:**

1. **Defined a schema in Sanity for the API data.**

2. **Fetched data from an external API.**

3. **Inserted the data into Sanity.**

4. **Retrieved and displayed the data in a Next.js application.**

**END POINT:**  
**https://template-0-beta.vercel.app/api/product**