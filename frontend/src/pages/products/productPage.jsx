// import React from "react";
// import { useNavigate } from "react-router-dom";
// import products from "../../json/products.json"

// const ProductListingPage = () => {

//     const navigate = useNavigate();

//     const handleViewDetails = (productId) => {
//         navigate(`/product/${productId}`);
//     };

//     return (
//         <div className="min-h-screen  p-6">
//             <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {Object.keys(products).map((id) => {
//                     const product = products[id]
//                     return (
//                         <div key={id} className=" shadow-lg rounded-lg p-6">
//                             <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
//                             <p className="text-gray-600 mb-4">{product.description}</p>
//                             <p className="text-lg font-bold mb-4">₹{product.price}</p>
//                             <button
//                                 onClick={() => handleViewDetails(id)}
//                                 className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//                             >
//                                 View Details
//                             </button>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     );
// };

// export default ProductListingPage;


import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import products from "../../json/products.json";
import Background from "../../component/background";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ProductListingPage = () => {
    const navigate = useNavigate();
    const productCardsRef = useRef([]); // Ref for product cards

    // Handle "View Details" button click
    const handleViewDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    // GSAP animations on component mount
    useEffect(() => {
        // Animate the title
        gsap.fromTo(".page-title", {
            opacity: 0,
            y: -50,
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
        });

        // // Add scroll-triggered animations for each product card
        productCardsRef.current.forEach((card, index) => {
            gsap.fromTo(card, {
                opacity: 0,
                y: 50,
            }, {
                opacity: 1,
                // y:0,
                ease: "power3.out",
                duration: 0.5,
                delay: 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                },
            });
        });
    }, []);

    return (
        <div className="min-h-screen px-6 pb-20 ">

            {/* background  */}
            <Background />

            {/* Page Title */}
            <h1 className="page-title text-3xl font-bold text-center pt-6 z-50 relative">Our Products</h1>

            {/* Product Grid */}
            <div className="product-grid grid grid-cols-1 md:grid-cols-3 gap-6 z-50 relative">
                {Object.keys(products).map((id, index) => {
                    const product = products[id];
                    return (
                        <div
                            key={id}
                            ref={(el) => (productCardsRef.current[index] = el)} // Assign ref to each card
                            className="product-card bg-[#ffffff41] backdrop-blur-md shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl"
                        >
                            <h2 className="text-xl font-semibold pb-2">{product.name}</h2>
                            <p className="text-gray-600 pb-4">{product.description}</p>
                            <p className="text-lg font-bold pb-4">₹{product.price}</p>
                            <button
                                onClick={() => handleViewDetails(id)}
                                className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                            >
                                View Details
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductListingPage;