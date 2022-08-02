export default function setBump(delay)
{
    return new Promise((res)=>
    {
        setTimeout(()=>
        {
           res()
        },delay)
    })
}