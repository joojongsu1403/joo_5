 //5. section work_sign li 태그 유동적 추가.
 const signFrame = document.getElementById('sign_frame');
 const signFrameChild = signFrame.children;

 const signPic = 12; // sign 올릴 사진 개수 조절
 for (let i = 0; i < signPic; i++) {
     let createli = document.createElement('li');
     createli.classList = 'sign_pic';
     signFrameChild[0].appendChild(createli);
 }

 //5. section work_sign 사진 배열.
 const picLi = document.getElementsByClassName('sign_pic');

 function picNum() {
     for (let i = 0; i < picLi.length; i++) {
         picLi[i].style.backgroundImage = `url(sign/sign_pic_con_${i+1}.png)`;
     }
 }
 //picNum();


 //5. section work_sign 클릭 이벤트.
 const signArrowLeft = document.getElementById('sign_left');
 const signArrowRight = document.getElementById('sign_right');


 let signCount = 0;
 let carrerNumber;

 //signArrowLeft.addEventListener('click', signPositionLeft);
 //signArrowRight.addEventListener('click', signPositionRight);

 function signPositionLeft() {
     signCount--;
     if (signCount < 0) signCount = 0;
     signImgMov(signCount);
     signArrow(carrerNumber);
 }

 function signPositionRight() {
     signCount++;
     if (signCount > carrerNumber - 1) signCount = carrerNumber - 1;
     signImgMov(signCount);
     signArrow(carrerNumber);
 }


 //5. section work_sign 카운터에 맞춰 포지션 변경

 function signImgMov(positionNum) {
     function signImgMovCount(positionNum, carrerItem, itemSize) {
         signFrameChild[0].style.left = (-positionNum * carrerItem) * itemSize + 'px';
     }

     if (window.innerWidth >= 1280) {
         signImgMovCount(positionNum, 3, 315);
     } else if (window.innerWidth >= 760) {
         signImgMovCount(positionNum, 2, 300);
     } else if (window.innerWidth <= 759) {
         signImgMovCount(positionNum, 2, 145);
     }
 }

 if (window.innerWidth >= 1280) {
     carrerNumber = picLi.length / 3;
 } else if (window.innerWidth <= 1279) {
     carrerNumber = picLi.length / 2;
 }


 //5. section work_sign 화살표 반응
 function signArrow(number) {
     if (signCount === 0) {
         signArrowLeft.style.opacity = .2;
     } else if (signCount === number - 1) {
         signArrowRight.style.opacity = .2;
     } else {
         signArrowLeft.style.opacity = 1;
         signArrowRight.style.opacity = 1;
     }
 }
const signMovePoint = document.getElementById('sign_move_point');
 function initFive() {
     picNum();
     signArrowLeft.addEventListener('click', signPositionLeft);
     signArrowRight.addEventListener('click', signPositionRight);
     swipeTouch(signMovePoint, signPositionLeft, signPositionRight, 7);
 }

 initFive();

 //6. carrer 없음.

 //7. footer 클릭시 주소 복사.
 const eMailText = document.getElementById('email');
 const eMailValue = eMailText.textContent;
 var copyText = function () {
     copyToAddress(eMailValue.replace(/(\s*)/g, ""))
 };

 function copyToAddress(val) {
     const t = document.createElement("textarea");
     document.body.appendChild(t);
     t.value = val;
     t.select();
     document.execCommand('copy');
     document.body.removeChild(t);
     alert('이메일 주소가 복사되었습니다.');
 }



 if (window.innerWidth >= 1280) {
     eMailText.addEventListener('mouseenter', function () {
         eMailText.style.backgroundColor = "#cabbe9";
     });

     eMailText.addEventListener('mouseout', function () {
         eMailText.style.backgroundColor = "#ffcef3";
     });
     eMailText.addEventListener('click', copyText);
 }



 
 


