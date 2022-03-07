const searchEL = document.querySelector('.search');
const searchInputEL = searchEL.querySelector('input');

searchEL.addEventListener('click', function(){
    searchInputEL.focus();
});

searchInputEL.addEventListener('focus', function(){
    searchEL.classList.add('focused');
    searchInputEL.setAttribute('placeholder', '통합검색');
});

// blur는 이벤트를 제거
searchInputEL.addEventListener('blur', function(){
    searchEL.classList.remove('focused');
    searchInputEL.setAttribute('placeholder', '');
});

const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); 
