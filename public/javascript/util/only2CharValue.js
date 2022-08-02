export default function only2CharValue(value)
{
    if(Number(value.length)>2)
    {
        return Number(value.substring(0,2));
    }
    return value
}