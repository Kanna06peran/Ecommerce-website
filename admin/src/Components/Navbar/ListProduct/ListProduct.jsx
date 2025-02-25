import React, { useEffect, useState } from "react";
import "./ListProduct.css"
import cross_icon from "../../../assets/cross_icon.png"

function ListProduct(){

    const [allproducts,setAllProducts] = useState([]);

    const fetchInfo = async ()=>{
        await fetch('hhtp://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)})
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const remove_product = async (id)=>{
        await fetch('http://localhost:4000/removeproduct',{
          method:"POST",
          headers:{
            Accept:"application/json",
            'Content-Type':'application/json',
          },
          body:JSON.stringify({id:id})
          
        })
        await fetchInfo();
    }
    return(<div className="list-product">
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
            <hr/>
            {allproducts.map((product,index)=>{
                return <> <div key={index} className="listproduct-format-main listproduct-format">
                    <img src={product.image} alt="" className="listproduct-product-icon"></img>
                    <p>{product.name}</p>
                    <p>${product.old_price}</p>
                    <p>${product.new_price}</p>
                    <p>{product.category}</p>
                    <img onClick={()=>{remove_product(product.id)}} className="listproduct-remove-icon" src={cross_icon} alt=""></img>
                </div>
                <hr/>
                </>
            })}
        </div>

    </div>)
}

export default ListProduct


// 
// import React, { useState, useCallback } from "react";
// import "./ListProduct.css";
// import cross_icon from "../../../assets/cross_icon.png";

// function ListProduct() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchInfo = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:4000/allproducts');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setAllProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Fetch data on mount
//   React.useEffect(() => {
//     fetchInfo();
//   }, [fetchInfo]);

//   const removeProduct = async (id) => {
//     try {
//       await fetch('http://localhost:4000/removeproduct', {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ id })
//       });
//       fetchInfo(); // Re-fetch data to update the list
//     } catch (error) {
//       console.error('Error removing product:', error);
//     }
//   };

//   return (
//     <div className="list-product">
//       <h1>All Products List</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <div className="listproduct-format-main">
//             <p>Products</p>
//             <p>Title</p>
//             <p>Old Price</p>
//             <p>New Price</p>
//             <p>Category</p>
//             <p>Remove</p>
//           </div>
//           <div className="listproduct-allproducts">
//             <hr />
//             {allProducts.map((product) => (
//               <React.Fragment key={product.id}>
//                 <div className="listproduct-format-main listproduct-format">
//                   <img src={product.image} alt={product.name} className="listproduct-product-icon" />
//                   <p>{product.name}</p>
//                   <p>${product.old_price}</p>
//                   <p>${product.new_price}</p>
//                   <p>{product.category}</p>
//                   <img
//                     onClick={() => removeProduct(product.id)}
//                     className="listproduct-remove-icon"
//                     src={cross_icon}
//                     alt="Remove"
//                   />
//                 </div>
//                 <hr />
//               </React.Fragment>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default ListProduct;
// 
