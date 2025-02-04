const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/" , (req , res)=>{
    res.send("Payment server")
})

// Mock payment gateway endpoint
app.post("/process-payment", (req, res) => {
  setTimeout(() => {
    const num = Math.random() 
    const success = num > 0.4; // Randomly simulate success/failure
    console.log(num)
    if (success) {
      res.status(200).json({error:false, status: "success", message: "Payment successful!" });
    } else {
      res.status(400).json({error:true, status: "failed", message: "Payment failed. Please try again." });
    }
  }, 10000); // send response in 10-second delay
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});