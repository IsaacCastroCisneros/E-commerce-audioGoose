export default function mobNavbar()
{
    window.addEventListener('DOMContentLoaded',linkMarker)
    window.addEventListener('click',showNavbar)
}

function linkMarker()
{
    const url = window.location.href;
    const links = [...document.querySelectorAll('[data-nav-bar-link]')];
    const pages = links.map(page=>page.dataset.navBarLink);
    
    const currentPage = pages.find(page=> url.includes(page));
    
    if(currentPage === undefined)
    {
        const currentLink = document.querySelector(`[data-nav-bar-link=home]`); 
        currentLink.classList.add('active');
        return
    }

    const currentLink = document.querySelector(`[data-nav-bar-link=${currentPage}]`); 
    currentLink.classList.add('active');
}
function showNavbar(e)
{
    const layer = document.querySelector('[data-body-layer]');
    const button = document.querySelector('[data-nav-bar-mob-button]');

    if(e.target.closest('[data-nav-bar-mob-button]')===null
    && e.target.closest('[data-mob-nav-bar]')===null)
    {
      const menuActive = document.querySelector('[data-mob-nav-bar].show');
      if(menuActive===null)return
      menuActive.classList.remove('show');
      layer.classList.remove('show');  
      button.classList.remove('active'); 
      return
    }

    const menu = document.querySelector('[data-mob-nav-bar]');
    if(e.target.closest('[data-nav-bar-mob-button]')!==null)
    {
      menu.classList.toggle('show');  
      layer.classList.toggle('show');  
      button.classList.toggle('active');  
    }
}
