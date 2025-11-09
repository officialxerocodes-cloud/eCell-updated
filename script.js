const buttons = document.querySelectorAll(".cart");
const cartItems = document.getElementById("cartItems");
const cartList = document.getElementById("cart-list");
const bills = document.getElementById("bill");
const cartItems2 = document.getElementById("cartItems2");
const contactForm = document.getElementById("contactForm");
const clearCart = document.getElementById("clearCart");
const checkout = document.getElementById("checkout");
let totalBill = 0;
let itemsNumber = 0;
let quantity = {};

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const btnId = btn.getAttribute("id");
        
        const reGenText = () => {
            btn.innerText = "Add to Cart";
            btn.style.background = "linear-gradient(135deg, #f97316, #facc15)";
        };
        
        if (btnId) {
            const price = btn.dataset.price;
            const productName = btn.dataset.product;
            const imgSrc = btn.dataset.image;
            const liId = `liId-${btnId}`;
            let liSpecific = document.getElementById(liId);
            
            //using or operator we create a key if it doesnt exist
            quantity[btnId] = (quantity[btnId] || 0)+1;

            if (!liSpecific) {
                liSpecific = document.createElement("li");
                liSpecific.id = liId;
                const span = document.createElement("span");
                //Creatin a img tag
                const img = document.createElement("img");
                img.classList.add("img-js");
                img.src = imgSrc;
                img.alt = "error";
                img.width = "100";
                //span to show info for the item
                span.textContent = `₹${price}:${productName} Quantity:${quantity[btnId]}`;
                liSpecific.appendChild(img);
                liSpecific.appendChild(span);
                cartList.appendChild(liSpecific);
            } else {
                //if user is clicking it more than once
                liSpecific.querySelector("span").textContent =  `₹${price}:${productName}, Quantity:${quantity[btnId]}`; 
            }
            //for updating info everytime user clicks a btn
            itemsNumber++;
            cartItems.innerText = itemsNumber;
            cartItems2.innerText = itemsNumber;
            //here price is a string so converting it to numberr
            totalBill = totalBill+Number(price);
            console.log(totalBill);
            bills.innerText = `₹${totalBill}`;
            btn.innerText = "✅Added";
            btn.style.background = "green";
            setTimeout(reGenText,800);
            
            
        }
    })
});

contactForm.addEventListener("submit",function(e){
    e.preventDefault();
    alert("💌Your query has been submitted. We'll contact you at the earliest!");
    contactForm.reset();
});

clearCart.addEventListener("click", () => {
    
    if (totalBill === 0){
        alert("There is nothing in cart to empty!");
    }else{
        const confirmClearCart = confirm("❗Are you sure you want to clear your cart?");
        if (confirmClearCart) {
            cartList.innerHTML = "";
            itemsNumber = 0;
            quantity = {};//this is to reset everything to zero
            cartItems.innerText = itemsNumber;
            cartItems2.innerText = itemsNumber;
            totalBill = 0;
            bills.innerText = `₹${totalBill}`;
        }else {}
    }
});

checkout.addEventListener("click", () => {
    if (totalBill === 0){
        alert("⚠️Please add items to checkout");
    }else{
        alert(`your total bill is ${totalBill} | No. of Items purchased: ${itemsNumber} \n Thank you for your purchase!🎉`);
        cartList.innerHTML = "";
        itemsNumber = 0;
        quantity = {};//is to reset everything to zero
        cartItems.innerText = itemsNumber;
        cartItems2.innerText = itemsNumber;
        totalBill = 0;
        bills.innerText = `₹${totalBill}`;
    }
});




