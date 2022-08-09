/* const LOCAL_STORAGE = 'totals'; */
import addGlobalEventListener from "../util/addGlobalEventListener.js";
import formatCurrency from "../util/formatCurrency.js";

let LOCAL_STORAGE = 'cart';


export default function checkout()
{
    let cart = getCart() || [];

    const url = window.location.href;
    const urlCasting = url.split('/');
    const urlLastPart = urlCasting[urlCasting.length-1];

    if(urlLastPart!=='checkout')return

    const button = document.querySelector('[data-checkout-summary-button]');
    button.classList.remove('disable')
    if(cart.length===0)
    {
        button.classList.add('disable');
    }

    const container = document.querySelector('[data-checkout-summary-product-container]');
    container.innerHTML='';

    const all = document.querySelector('[data-checkout-summary-product-all]');
    all.value=cart.length;

    cart.forEach(renderCartItems);
    calculateTotals(cart);

    addGlobalEventListener('submit','[data-checkout-form]',e=>
    {
        cart=[];
        setCart(cart);
    });

    addGlobalEventListener('click','[data-checkout-summary-button]',e=>
    {
        const inputs = [...document.querySelectorAll('[data-checkout-input]')];

        inputs.forEach(input=>
        {
            const container = input.closest('[data-checkout-input-container]')
            const msg = container.querySelector('span');

            msg.classList.remove('show');
            input.classList.remove('border');

            if(input.value==='')
            {;
                msg.classList.add('show');
                input.classList.add('border');
            }
        })
    })
}

function renderCartItems(item)
{
    const template = document.querySelector('[data-checkout-summary-template]');
    const clone = template.content.cloneNode(true);
    const imgClone = clone.querySelector('[data-checkout-summary-img]');
    const nameClone = clone.querySelector('[data-checkout-summary-name]');
    const priceClone = clone.querySelector('[data-checkout-summary-price]');
    const quantityClone = clone.querySelector('[data-checkout-summary-quantity]');
    const inputDataClone = clone.querySelector('[data-checkout-summary-product-data]');

    imgClone.src=item.imgPath;
    nameClone.textContent=item.name;
    priceClone.textContent=formatCurrency(item.price);
    quantityClone.textContent='x'+item.quantity;
    inputDataClone.value=`{"id":"${item.id}","quantity":"${item.quantity}"}`;

    const container = document.querySelector('[data-checkout-summary-product-container]');
    container.appendChild(clone)
}

function calculateTotals(cart)
{
   const shippingElement = document.querySelector('[data-checkout-summary-shipping]');
   const vatElement = document.querySelector('[data-checkout-summary-vat]');
   const totalElement = document.querySelector('[data-checkout-summary-total]');
   const grandTotalElement = document.querySelector('[data-checkout-summary-grand-total]');

   const prices = cart.map(item=>item.price*item.quantity);
   const totals = prices.reduce((tot,num)=>
   {
     if(num<0)num=0;
     return tot + num
   },0);
   const vat = Math.round(totals * 0.16);
   const grandTotals = Math.round(totals + vat + 50);

   totalElement.textContent=formatCurrency(totals);
   grandTotalElement.textContent=formatCurrency(grandTotals);
   shippingElement.textContent=formatCurrency(50);
   vatElement.textContent=formatCurrency(vat);
}

function getCart()
{
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE)) || []
}
function setCart(cart)
{
    localStorage.setItem(LOCAL_STORAGE,JSON.stringify(cart))
}
