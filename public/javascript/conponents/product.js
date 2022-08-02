import only2CharValue from "../util/only2CharValue.js";

export default function product()
{
    const input = document.querySelector('[data-content-product-form-input]');
    if(input===null || input===undefined)return
    
    window.addEventListener('click',e=>
    {     
        if(e.target.closest('[data-content-product-form-btn]')===null)return

        const button = e.target.closest('[data-content-product-form-btn]');
        const container = e.target.closest('[data-content-product-form-container]');
        const input = container.querySelector('input');

        if(button.classList.contains('plus'))
        {
            if(Number(input.value)===99)return
            input.value++
        }
        else
        {
            if(Number(input.value)===0)return
            input.value--
        }
    })
    input.addEventListener('input',e=>
    {
        const err = document.querySelector('[data-content-product-err]');
        if(e.data==='-'||e.data==='+')
        {
            err.classList.add('show');
        }
        else
        {
            err.classList.remove('show');
        }

        input.value = only2CharValue(input.value);
    })
}