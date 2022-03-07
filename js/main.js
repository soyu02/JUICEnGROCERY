const badgeEL = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

//throttle 은 lodash.cdn 스크립트를 추가하여 이벤트가 너무 많이 발생하여 사이트가 버벅이는 과부하를 막기위해 사용함, 3초마다 실행되도록 설정함
// _.throttle(함수, 시간)
window.addEventListener('scroll', _.throttle(function(){
    console.log(window.scrollY);
    if (window.scrollY > 500){
        //배지 hide
        //badgeEL.style.display = 'none';
        //gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEL, .6, {
            opacity: 0,
            //opacity만 사용하여 요소를 안보이게 처리 할 경우 요소가 사라진게 아니기 때문에 클릭 이벤트나 커서 포인터가 되어있을 경우 보이지 않은 요소에 이벤트들이 
            //그대로 남아있기 떄문에 display 속성을 이용하여 요소를 제거한다.
            //숫자는 ''가 필요없으며 문자로 입력할때는 ''안에 css값을 써준다.
            display: 'none'
        });
        //버튼 보이기
        // gsap.to('#to-top', .2, {
        gsap.to(toTopEl, .2, {
            x: 0
        });
    } else{
        //배지 show
        //badgeEL.style.display = 'block';
        gsap.to(badgeEL, .6, {
            opacity: 1,
            display: 'block'
        });
        //버튼 숨기기
        // gsap.to('#to-top', .2, {
        gsap.to(toTopEl, .2, {
            x: 100
        });
    }
}, 300));


toTopEl.addEventListener('click', function () {
    gsap.to(window, .7, {
        scrollTo: 0
    });
});

const fadeELS = document.querySelectorAll('.visual .fade-in');
fadeELS.forEach(function(fadeEL, index){
    gsap.to(fadeEL, 1, {
        delay: (index + 1) * .7,  //0.7s, 1.4s, 2.1s, 2.7s index가 0부터 시작이기 때문에 +1을 더해준다.
        opacity: 1
    });
});

//new Swiper(선택자, 옵션(객체 데이터 형식)), new는 자바스크립트 생성자 (클래스)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});

new Swiper('.promotion .swiper-container',{
    slidesPerView:3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    loop: true,
    autoplay: {
        delay: 5000
    },
    pagination: {
        el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
        clickable: true //사용자의 페이지 번호 요소 제어
    },
    navigation: { // 슬라이드 이전/다음 버튼 사용 여부
        prevEl: '.promotion .swiper-prev', // 이전 버튼 선택자
        nextEl: '.promotion .swiper-next' // 다음 버튼 선택자
      }
});

new Swiper('.awards .swiper-container', {
    autoplay: true,
    loop: true,
    slidesPerView:5, 
    spaceBetween: 30,
    navigation: {
        prevEl: '.promotion .swiper-prev', 
        nextEl: '.promotion .swiper-next' 
    }
});

const promotionEL = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function(){
    isHidePromotion = !isHidePromotion  //!가 특정한 변수 앞에 붙을때는 그 값의 반대에 해당하는 값을 변환
    if (isHidePromotion) {
        //숨김 처리
        promotionEL.classList.add('hide');
    }else{
        //보임 처리
        promotionEL.classList.remove('hide');
    }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
function floatingObject(selector, delay, size) {
    gsap.to
        (selector, //선택자
        random(1.5, 2.5), //애니매이션 동작 시간
        {   //옵션
            y: size,
            repeat: -1, //반복
            yoyo: true, //진행 후 다시 돌아오는
            ease: Power1.easeInOut,
            delay: random(0, delay)
        }
    );
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
    new ScrollMagic
    .Scene({ // 감시할 장면(Scene)을 추가
        triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
        triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
        })
        .setClassToggle(spyEl, 'show') // 요소가 화면에 보이면 show 클래스 추가
        .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수!)
});