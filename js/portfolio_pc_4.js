
//4. section work_web 홈페이지 바로가기
        const webHover = document.getElementsByClassName('web_hover');

        function webTitle() {
            
            for (let i = 0; i < webHover.length; i++) {

                const creatDiv = document.createElement('a');
                
                if(window.innerWidth >= 1280){
                webHover[i].addEventListener('mouseenter', function(e) {
                    creatDiv.classList = 'select_box';
                    creatDiv.setAttribute('href', `https://joojongsu1403.github.io/joo_${i+1}/`);
                    creatDiv.setAttribute('target', '_blank');
                    creatDiv.innerText = '홈페이지 바로가기';
                    this.appendChild(creatDiv);
                    // 휠 이벤트 리스너
                    webHover[i].addEventListener("wheel", wheel, {
                        passive: false //휠 수동 변환식
                    }); 
                });

                webHover[i].addEventListener('mouseleave', function(e) {
                    this.removeChild(creatDiv);
                });
                    
                } else if(window.innerWidth >= 760){
                    creatDiv.classList = 'select_box';
                    creatDiv.setAttribute('href', `https://joojongsu1403.github.io/joo_${i+1}/`);
                    creatDiv.setAttribute('target', '_blank');
                    webHover[i].appendChild(creatDiv);
                }
            }
        }

        //webTitle();



        //4. section work_web 클릭 이벤트
        const webArrowLeft = document.getElementById('web_left'); // 왼쪽 클릭;
        const webArrowRight = document.getElementById('web_right'); // 오른쪽 클릭;
        const webHoverLength = webHover.length; // 타이틀 갯수.

        let webCount = 0; // web 부분에서 움직임을 컨트롤 함.

        
        //클릭 이벤트 실행문.
        //webArrowLeft.addEventListener('click', webPositionLeft);
        //webArrowRight.addEventListener('click', webPositionRight);

        function webPositionLeft() {
            webCount--;
            if (webCount < 0) webCount = 0;
            webUpDownAni(webCount);
            webImgMov(webCount);
            webArrow();
        }

        function webPositionRight() {
            webCount++;
            if (webCount >= webHoverLength - 1) webCount = webHoverLength - 1;
            webUpDownAni(webCount);
            webImgMov(webCount);
            webArrow();
        }
        
        //4. section work_web 휠 이벤트
        //홈페이지 바로가기 mouseenter에 해당 이벤트 리스너 포함되어 있음.
        var wheel = function() {webWheel(event);};

        function webWheel(e) {
            e.preventDefault();
            if (e.deltaY > 0) {
                webCount++;
                if (webCount >= webHoverLength - 1) webCount = webHoverLength - 1;
                webUpDownAni(webCount);
                webImgMov(webCount);
                webArrow();
            } else {
                webCount--;
                if (webCount < 0) webCount = 0;
                webUpDownAni(webCount);
                webImgMov(webCount);
                webArrow();
            }
        }


        //4. section work_web 카운터에 맞춰 포지션 변경
        const webFrameWheel = document.getElementById('web_wheel');

        function webImgMov(num) {
            if(window.innerWidth >= 1280){
                webFrameWheel.style.left = -num * 880 +'px';
            } else if( window.innerWidth >= 760) {
                webFrameWheel.style.left = -num * 562 +'px';
            }
            
        }
        

        //4. section work_web 화살표 반응
        const webArrGuide = document.querySelector('#web_click_guide');
        function webArrow(){
            if(webCount === 0){
                webArrowLeft.style.opacity = .2;
                webArrGuide.style.opacity = .7;
            } else if(webCount == webHoverLength-1) {
                 webArrowRight.style.opacity= .2;
            } else {
                webArrGuide.style.opacity = .2;
               webArrowLeft.style.opacity= 1;
                webArrowRight.style.opacity= 1;
            }
        }
        
        
        //4. section work_web 카운터에 맞춰 텍스트 순서 변경
        const webText = document.getElementsByClassName('web_change_text');
        //const webOn = webArrowLeft.onmouseenter

        function webUpDownAni(num) {
            //if(webCount <= 0 && webOn.target) return; //조건걸기 어렵네...
            for (let i = 0; i < webText.length; i++) {
                webText[i].style.top = '10px';
                webText[i].style.opacity = 0;
                setTimeout(function() {
                    webTextNum(num);
                    webText[i].style.top = 0;
                    webText[i].style.opacity = 1;
                }, 600);
            }
        }
        
                 
        
        //4. section work_web 하단 텍스트 배열
        const webHomeage = ['new', 'renewal', 'renewal', 'new'];
        const webType = ['my portfolio ver.2', 'fashion eye glasses', 'my portfolio ver.1', 'game development'];
        const webPeriod = ['2019.5.1~ 2019.5.27', '2018.5.1~ 2018.5.20', '2018.5.21~ 2018.6.7', '2018.4.12~ 2018.4.30'];

        function webTextNum(num) {
            webText[0].innerText = webHomeage[num].toUpperCase();
            webText[1].innerText = webType[num].toUpperCase();
            webText[2].innerText = webPeriod[num];
        }


        //4. section work_web 실행문
        function initFour(){
            webArrowLeft.addEventListener('click', webPositionLeft);
            webArrowRight.addEventListener('click', webPositionRight);
            webTitle();
        }

        initFour();
    
