const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');
const adminProductsRouter = require('./routes/admin/products-routes');
const adminOrderRouter = require('./routes/admin/order-routes');

const shopProductsRouter = require('./routes/shop/products-routes');
const shopCartRouter = require('./routes/shop/cart-routes');
const shopAddressRouter = require('./routes/shop/address-routes');
const shopOrderRouter = require('./routes/shop/order-routes');
const shopSearchRouter = require('./routes/shop/search-routes');
const shopReviewRouter = require('./routes/shop/review-routes');

const commonFeaturesRouter = require('./routes/common/feature-routes');

mongoose.connect('mongodb+srv://zayya4281:KyawZayYa1122@cluster0.gevpgb5.mongodb.net/ecomerse?retryWrites=true&w=majority')
//mongoose.connect('mongodb://localhost:27017/eco')
.then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders : [
        "Content-type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma"
    ],
    credentials : true
}))

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter)
app.use("/api/admin/products", adminProductsRouter);
app.use('/api/admin/orders', adminOrderRouter)

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use('/api/shop/search', shopSearchRouter);
app.use('/api/shop/reviews', shopReviewRouter);

app.use('/api/common/feature', commonFeaturesRouter);

app.listen(PORT , () => console.log("Server is running on port "+ PORT));


//7 : 26