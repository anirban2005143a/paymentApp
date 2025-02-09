import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import products from "../../json/products.json";
import { ToastContainer, toast } from "react-toastify"
import Background from "../../component/background";

const PaymentPage = () => {

    const navigate = useNavigate()

    const { productId } = useParams();
    const [product, setProduct] = useState(products[productId]);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [subtotal, setSubtotal] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [tax, setTax] = useState(null);

    // Refs for GSAP animations
    const headerRef = useRef(null);
    const paymentContainerRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (product && product != {}) {
            // Calculate subtotal, tax, and total amount
            const subtotalState = product.price;
            setSubtotal(subtotalState);
            const taxState = subtotalState * 0.18;
            setTax(taxState);
            setTotalAmount(subtotalState + taxState);
        }

    }, [product])


    const handlePayment = async () => {
        setIsLoading(true);
        setPaymentStatus(null);

        try {

            // for local system replace ${import.meta.env.VITE_REACT_BACKEND_URL} with http://localhost:3000
            const response = await axios.post(`${import.meta.env.VITE_REACT_BACKEND_URL}/process-payment`, {
                amount: product.price,
            });
            setPaymentStatus(response.data.status);
            toast.success("Payment successful!")

        } catch (error) {
            console.log(error)
            setPaymentStatus("failed");
            if (error.response && error.response.data.message) toast.error(error.response.data.message)
            else toast.error(error.message)

        } finally {
            setIsLoading(false);
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <strong className=" text-4xl text-red-600" >Invalid Product Id</strong>
            </div>
        );
    }

    console.log(paymentStatus)

    return (
        <>
            {/* toast for notification  */}
            <ToastContainer />

            {/* background  */}
            <Background />

            {/* loader upto the product detail not loaded  */}
            {(!tax || !subtotal || !totalAmount) && <div className="min-h-screen flex items-center justify-center">
                <FaSpinner className="animate-spin text-4xl text-blue-600" />
            </div>}


            {/* main section  */}
            {subtotal && tax && totalAmount && product && <div className="min-h-screen relative flex flex-col items-center  p-4">
                {/* navigate to products */}
                <div className=" absolute text-[#ffffff] z-50 translate-y-[50%] left-[30px]  text-4xl cursor-pointer"
                    onClick={() => {
                        navigate("/")
                    }} ><HiShoppingCart />
                </div>

                {/* Header */}
                <div
                    ref={headerRef}
                    className=" bg-[#4e56ff4e] backdrop-blur-md rounded-lg text-black w-full py-10 text-center shadow-lg"
                >
                    {/* branding  */}
                    <h1 className="text-3xl font-bold pt-5">Payment Summary</h1>
                    <p className="text-sm mt-2">Floww APIs Private Limited</p>

                </div>

                {/* Payment and product Details */}
                <div
                    ref={paymentContainerRef}
                    className="payment-containe shadow-2xl rounded-lg p-8 mt-8 w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-105"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-blue-600">Payment Details</h2>
                    <div className="space-y-4">
                        <p className="text-gray-700">
                            <span className="font-medium">Product Name:</span> {product.name}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Product Description:</span> {product.description}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Price:</span> ₹{product.price}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-medium">Tax (18% GST):</span> ₹{tax.toFixed(2)}
                        </p>
                        <p className="text-gray-700 font-bold">
                            <span className="font-medium">Total Amount:</span> ₹{totalAmount.toFixed(2)}
                        </p>
                    </div>

                    {/* Pay Now Button */}
                    <button
                        onClick={handlePayment}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r cursor-pointer from-blue-600 to-blue-500 text-white py-3 rounded-lg mt-8 hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 transition-all duration-300"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <FaSpinner className="animate-spin mr-2" />
                                Processing...
                            </div>
                        ) : (
                            "Pay Now"
                        )}
                    </button>

                    {/* Payment Status */}
                    {paymentStatus && (
                        <div
                            className={`payment-status mt-6 text-center text-lg font-semibold ${paymentStatus === "success" ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            {paymentStatus === "success" ? "Payment successful! 🎉" : "Payment failed. Please try again."}
                        </div>
                    )}

                    {/* Loading Message */}
                    {isLoading && (
                        <div className="mt-6 text-center text-gray-600">
                            Payment in progress. Please do not close this window.
                        </div>
                    )}
                </div>

                {/* Footer */}
                <footer
                    ref={footerRef}
                    className="mt-12 text-center text-gray-600  p-4 rounded-lg shadow-lg w-full max-w-md"
                >
                    <p>Contact Support: support@flowwapis.com | +91 1234567890</p>
                </footer>
            </div>}
        </>

    );
};

export default PaymentPage;
