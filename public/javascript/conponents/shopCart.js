import setBump from "../util/setBump.js";
import addGlobalEventListener from "../util/addGlobalEventListener.js";
import only2CharValue from "../util/only2CharValue.js";
import checkout from "./checkout.js";
import formatCurrency from "../util/formatCurrency.js";

const LOCAL_STORAGE = 'cart';

let cart = getCart();

function getCart()
{
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE)) || []
}
function setCart()
{
    localStorage.setItem(LOCAL_STORAGE,JSON.stringify(cart))
}

let cont = 0;
export default function shopCart()
{
    renderProductCart();

    addGlobalEventListener('submit','[data-content-product-form]',createNotification);
    addGlobalEventListener('click','[data-notification-icon-cross]',e=>
    {
        const notification= e.target.closest('[data-notification]');
        notification.remove();
    });
    addGlobalEventListener('click','[data-nav-bar-button]',e=>
    {
        const shopCart = document.querySelector('[data-shopcart]');
        const layer = document.querySelector('[data-body-layer]');
        const body = document.querySelector('body');

        shopCart.classList.toggle('show');
        layer.classList.toggle('show');
        body.classList.toggle('overflow');
        
    });
    addGlobalEventListener('click','[data-shopcart-button-remove]',e=>
    {
        localStorage.removeItem(LOCAL_STORAGE);
        cart=[];
        renderProductCart();
        checkout();
    });
    addGlobalEventListener('input','[data-shopcart-product-input]',e=>
    {
        const itemId = e.target.closest('[data-shopcart-product]').dataset.id;
        const input = e.target.closest('[data-shopcart-product-input]');

        const currentItem = findItem(itemId);
        currentItem.quantity=Number(input.value);
        
        input.value= only2CharValue(input.value);

        calculateTotals();
        setCart();
        checkout();
    });
    addGlobalEventListener('submit','[data-shopcart-form]',e=>
    {
       e.preventDefault();

       const itemId = e.target.closest('[data-shopcart-product]').dataset.id;
       const input = e.target.querySelector('input');
       const button = e.submitter.classList.contains('plus');
     
       const currentItem = findItem(itemId)
       
       if(button)
       {
          input.value++;
       }
       else
       {
          input.value--;
       }

       removeItem(input.value,itemId,e.target.closest('[data-shopcart-product]'));
       
       currentItem.quantity=Number(input.value);
       setCart();
       calculateTotals();
       checkout();
    });
    window.addEventListener('click',e=>
    {
        if(e.target.closest('[data-nav-bar-button]')!==null || e.target.closest('[data-shopcart]')!==null)return

        const shopCart = document.querySelector('[data-shopcart]');
        const layer = document.querySelector('[data-body-layer]');
        const body = document.querySelector('body');
        
        shopCart.classList.remove('show');
        layer.classList.remove('show');
        body.classList.remove('overflow');
    })
}

async function createNotification(e)
{
    e.preventDefault();

    const item = await productRequest();
    const product = item.product;
    const coverPath = item.coverPath;

    const input = document.querySelector('[data-content-product-form-input]');
    const container = document.querySelector('[data-notification-container]');
    const name = document.querySelector('[data-content-product-name]').textContent;
    const quantity = input.value;

    createItem(product._id,
               product.name,
               Number(product.price),
               Number(quantity),
               coverPath);

    renderProductCart();

    if(Number(input.value)>0)
    {
       if(cont>8)
       {
          container.innerHTML='';
          cont=0;
       }
       cont++;
 
       const newNotification = renderNotification(name,cont);
       container.appendChild(newNotification);

       const currentNotification = document.querySelector(`[data-notification="${cont}"]`);
       await setBump(100);
       currentNotification.classList.add('show');
       await setBump(3500);
       currentNotification.classList.remove('show');
       await setBump(300);
       currentNotification.remove();
    }   
}

async function productRequest()
{
    const url = window.location.href;
    const urlCasting = url.split('/');
    const newUrl = urlCasting[urlCasting.length - 1];

    const res = await fetch(newUrl,
        {
            method:'POST'/* , */
            /* headers:
            {
                'Content-type':'application/json'
            } */
        })
    
    return res.json();

    /* fetch(newUrl,
        {
            method:'POST',
            headers:
            {
                'Content-type':'application/json'
            }
        })
        .then(res=> res.json())
        .then(data=> console.log(data)) */
}

function renderNotification(name,cont)
{
    const template = document.querySelector('[data-notification-template]');
    const notificationClone = template.content.cloneNode(true);
    const notification = notificationClone.querySelector('[data-notification]')
    const span = notification.querySelector('[data-notification-name]');

    span.textContent=name;
    notification.dataset.notification=cont;

    return notificationClone
}

function createItem(id,name,price,quantity,imgPath)
{
    let item =
    {
        id,
        name,
        quantity,
        price,
        imgPath
    }
    if(cart.length<1)
    {
        cart.push(item)
        setCart();
    }
    else 
    {
        const sameItem =cart.find(item=>item.name === name);
        
        if(sameItem!==null && sameItem!==undefined)
        {
            sameItem.quantity=sameItem.quantity+quantity;
            setCart();
        }
        else
        {
            cart.push(item)
            setCart();
        }
    }
}
function createProductCart(item)
{
    const template = document.querySelector('[data-shopcart-template]');
    const clone = template.content.cloneNode(true);
    const cloneId = clone.querySelector('[data-shopcart-product]');
    const cloneName = clone.querySelector('[data-shopcart-product-name]');
    const clonePrice = clone.querySelector('[data-shopcart-product-price]');
    const cloneImg = clone.querySelector('[data-shopcart-product-img]');
    const cloneInput = clone.querySelector('[data-shopcart-product-input]');
 
    cloneId.dataset.id=item.id;
    cloneName.textContent=item.name;
    clonePrice.textContent=formatCurrency(item.price);
    cloneImg.src=item.imgPath;
    cloneInput.value=item.quantity;

    cloneInput.addEventListener('blur',e=>
    {
        const item = e.target.closest('[data-shopcart-product]');
        removeItem(cloneInput.value,
            item.dataset.id,
            item)
    })

    return clone
}
function renderProductCart()
{
    const container = document.querySelector('[data-shopcart-product-container]');
   
    container.innerHTML='';
    if(cart.length===0) 
    {
        calculateTotals();
        return
    }
    const products = cart.map(createProductCart);
    products.forEach(product=>container.appendChild(product));
    calculateTotals();
}
function calculateTotals()
{
   const total = document.querySelector('[data-shopcart-total]'); 

   if(cart.length===0)
   {
      total.textContent=0;
      allQuantity();
      return
   }

   const prices = cart.map(item=>item.price*item.quantity);
   const totals = prices.reduce((tot,num)=>
   {
     if(num<0)num=0;
     return tot + num
   },0);

   total.textContent=formatCurrency(Number(totals));
   allQuantity();
}
function findItem(id)
{
   return cart.find(item=>item.id === id)
}
function allQuantity()
{
    const label = document.querySelector('[data-shopcart-quantity]');
    const notification = document.querySelector('[data-nav-bar-notification]');
    const inputs = [...document.querySelectorAll('[data-shopcart-product-input]')];

    const values = inputs.map(input=> Number(input.value))
    const all = values.reduce((tot,num)=>
    {
        if(num<0)num=0;
        return tot + num
    },0);

    label.textContent=all;
    if(all<1)
    {
        notification.classList.remove('show');
        return
    }
    notification.classList.add('show');
    notification.textContent=all;
}
function removeItem(inputValue,itemId,itemDOM)
{
    if(inputValue<=0)
    {
        itemDOM.remove();

        cart=cart.filter(product=>product.id!==itemId)
        renderProductCart();
        setCart();
    }
}