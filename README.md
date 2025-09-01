# 🛋️ Roomitude – Modern Furniture E-Commerce Platform  

Roomitude is a full-stack **furniture e-commerce application** built with **React + Django REST Framework**.  
It provides a seamless shopping experience with **product filtering, wishlist, cart (guest & user), checkout, Stripe payment, coupons, delivery charge calculation, and invoice download**.  

🔗 **Live Demo:** [https://roomitude-57oj.vercel.app//](https://roomitude-57oj.vercel.app//)  
📦 **Backend REST API:** [Roomitude DRF Repo](https://github.com/abdullah-124/roomitude_drf)  

---

## ✨ Features  

- **Authentication & Security**
  - JWT Authentication (Register, Login, Logout, Refresh Token)  
  - Guest cart system (add items without logging in)  
  - Secure Stripe integration & Cash on Delivery (COD)  

- **Product Management (CRUD)**  
  - Add, update, delete, and manage products  
  - Product filtering by category  
  - Product details with images and description  

- **Shopping Experience**  
  - Wishlist (add/remove)  
  - Cart with quantity updates  
  - Guest cart → Auto-merge with user cart on login  
  - Checkout with:
    - Coupon discounts  
    - Delivery charge calculation  
    - Stripe payment processing  
    - Cash on Delivery option  

- **Order & Invoice**  
  - Order placement with confirmation  
  - Automatic invoice generation after successful payment  
  - Download invoice as PDF (React-to-PDF, HTML-to-PNG)  

---

## 🛠️ Tech Stack  

### Frontend  
- ⚛️ React (Hooks)  
- 🎨 Tailwind CSS  
- 📋 React Hook Form  
- 💳 Stripe React SDK  
- 🖼️ html-to-png, react-to-pdf  

### Backend  
- 🐍 Django + Django REST Framework  
- 🔑 JWT Authentication  
- 💳 Stripe API (Payment Gateway)  
- 🗄️ SQLite3 (default, can be swapped with PostgreSQL/MySQL)  

---

## 🚀 Getting Started  

Follow these steps to run the project locally.  

### 1️⃣ Clone the repositories  

```bash
# Frontend
git clone https://github.com/your-username/roomitude-frontend.git
cd roomitude-frontend

# Backend
git clone https://github.com/abdullah-124/roomitude_drf.git
cd roomitude_drf
