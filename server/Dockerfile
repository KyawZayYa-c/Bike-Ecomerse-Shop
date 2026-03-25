# Node version ကို ရွေးချယ်ခြင်း
FROM node:18

# Container ထဲမှာ /app ဆိုတဲ့ folder ဆောက်ပြီး အလုပ်လုပ်မယ်
WORKDIR /app

# package.json နဲ့ package-lock.json ကို copy ကူးမယ်
# (ဒီမှာ ./server လို့ ရေးစရာမလိုပါဘူး၊ folder ထဲရောက်နေလို့ပါ)
COPY package*.json ./

# Library များ Install လုပ်ခြင်း
RUN npm install

# ကျန်တဲ့ Backend code အားလုံးကို Copy ကူးခြင်း
COPY . .

# Port သတ်မှတ်ခြင်း (Back4App အတွက် 8080)
EXPOSE 8080

# App ကို စတင် Run ခြင်း (သင့် main file က server.js ဖြစ်ရပါမယ်)
CMD ["node", "server.js"]