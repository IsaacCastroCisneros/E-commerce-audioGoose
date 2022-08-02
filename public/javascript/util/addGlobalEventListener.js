export default function addGlobalEventListener(type,selector,callback)
{
    window.addEventListener(type,e=>
    {
        if(e.target.closest(selector)===null)return
        callback(e);
    })
}