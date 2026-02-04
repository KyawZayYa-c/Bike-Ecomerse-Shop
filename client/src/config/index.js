

export const registerFormControls = [
    {
        name : 'username',
        label : 'User Name',
        placeholder : 'Enter your user name',
        componentType : 'input',
        type : 'text',
    },
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter your email',
        componentType : 'input',
        type : 'email',
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter your password',
        componentType : 'input',
        type : 'password',
    },
]

export const loginFormControls = [
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter your email',
        componentType : 'input',
        type : 'email',
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter your password',
        componentType : 'input',
        type : 'password',
    },
]

export const addProductFormElements = [
    {
        label : "Title",
        name : "title",
        componentType : "input",
        type : "text",
        placeholder: "Enter product title",
    },
    {
        label : "Description",
        name : "description",
        componentType : "textarea",
        placeholder : "Enter product description"
    },
    {
        label : "Category",
        name  : "category",
        componentType : "select",
        options : [
            // ဆိုင်ကယ်အမျိုးအစားများ (ဘီးကြီးများအတွက်)
            {id : "superbike", label : "Super Bike"},
            {id : "nakedbike", label : "Naked Bike"},
            {id : "adventure", label : "Adventure"},

            // အသုံးအဆောင် အုပ်စု (၁) - ခေါင်းပိုင်း
            {id : "headwear", label : "Helmet & Balaclava"},

            // အသုံးအဆောင် အုပ်စု (၂) - ကိုယ်ထည်ပိုင်း
            {id : "riding-gears", label : "Riding Gears"}
        ]
    },
    {
        label : "Brand",
        name : "brand",
        componentType : "select",
        options : [
            // ဆိုင်ကယ် Brand များ
            {id : "kawasaki", label : "Kawasaki"},
            {id : "yamaha", label : "Yamaha"},
            {id : "honda", label : "Honda "},
            {id : "ducati", label : "Ducati"},
            {id : "bmw", label : "BMW"},

            // Gear/Helmet Brand များ
            {id : "agv", label : "AGV"},
            {id : "ls2", label : "LS2"},
            {id : "alpinestars", label : "Alpinestars"},
            {id : "dainese", label : "Dainese"}
        ]
    },
    {
        label : "Price",
        name : "price",
        componentType : "input",
        type : "number",
        placeholder: "Enter product price",
    },
    {
        label : "Sale Price",
        name : "salePrice",
        componentType : "input",
        type : "number",
        placeholder : "Enter sale price (optional)",
    },
    {
        label : "Total Stock",
        name : "totalStock",
        componentType: "input",
        type : "number",
        placeholder: "Enter total stock",
    },
];

export const shoppingViewHeaderMenuItems = [
    {
        id : "home",
        label : "Home",
        path : "/shop/home",
    },
    {
        id : "products",
        label : "All Products",
        path : "/shop/listing",
    },
    {
        id : "superbike",
        label : "Super Bike",
        path : "/shop/listing",
    },
    {
        id : "nakedbike",
        label : "Naked Bike",
        path : "/shop/listing",
    },
    {
        id : "adventure",
        label : "Adventure",
        path : "/shop/listing",
    },
    {
        id : "headwear",
        label : "Helmets",
        path : "/shop/listing",
    },
    {
        id : "riding-gears",
        label : "Gears",
        path : "/shop/listing",
    },
    {
        id : "search",
        label : "Search",
        path : "/shop/search",
    },
];

export const categoryOptionsMap = {
    "superbike"    : 'Super Bike',
    "nakedbike"    : 'Naked Bike',
    "adventure"    : 'Adventure',
    "headwear"     : 'Helmet & Balaclava',
    "riding-gears" : 'Riding Gears',
}

export const brandOptionsMap = {
    'kawasaki'    : 'Kawasaki',
    'yamaha'      : 'Yamaha',
    'honda'       : 'Honda',
    'ducati'      : 'Ducati',
    'bmw'         : 'BMW',
    'agv'         : 'AGV',
    'ls2'         : 'LS2',
    'alpinestars' : 'Alpinestars',
    'dainese'     : 'Dainese',
}

export const filterOptions = {
    category : [
        {id : "superbike", label : "Super Bike"},
        {id : "nakedbike", label : "Naked Bike"},
        {id : "adventure", label : "Adventure"},
        {id : "headwear", label : "Helmet & Balaclava"},
        {id : "riding-gears", label : "Riding Gears"}
    ],
    brand : [
        {id : "kawasaki", label : "Kawasaki"},
        {id : "yamaha", label : "Yamaha"},
        {id : "honda", label : "Honda"},
        {id : "ducati", label : "Ducati"},
        {id : "bmw", label : "BMW"},
        {id : "agv", label : "AGV"},
        {id : "ls2", label : "LS2"},
        {id : "alpinestars", label : "Alpinestars"},
        {id : "dainese", label : "Dainese"}
    ],
}

export const sortOptions = [
    {id : "price-lowtohigh", label : "Price : Low to High"},
    {id : "price-hightolow", label : "Price : High to Low"},
    {id : "title-atoz", label : "Title: A to Z"},
    {id : "title-ztoa", label : "Title: Z to A"},
]

export const addressFormControls = [
    {
        label : 'Address',
        name : 'address',
        componentType : 'input',
        type : 'text',
        placeholder :'Enter your address',
    },{
        label : 'City',
        name : 'city',
        componentType: 'input',
        type : 'text',
        placeholder: 'Enter your city',
    },{
        label: 'Pincode',
        name : 'pincode',
        componentType: 'input',
        type : 'text',
        placeholder: 'Enter your pincode',
    },{
        label : 'Phone',
        name : 'phone',
        componentType : 'input',
        type : 'text',
        placeholder: 'Enter your phone number',
    },{
        label : 'Notes',
        name : 'notes',
        componentType: 'textarea',
        placeholder: 'Enter any additional notes',
    }
]

