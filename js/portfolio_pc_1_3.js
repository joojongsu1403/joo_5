window.onload = function () {

    //1.  header title start -----------------------------------------------------;


    //1. 타이틀 요일 가져오기.
    function buildDay() {
        const today = new Date();
        /*const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        const dDay = ['토', '일', '월', '화', '수', '목', '금'];
        let day;

        for (let i = 0; i < lastDate.getDay() + 1; i++) {
            count = i;

            for (let j = 0; j < dDay.length; j++) {
                if (count % 7 === j) {
                    day = dDay[j];
                    console.log(dDay[j]); //작동 확인용.
                };
            };
        };*/
        const week = ['일', '월', '화', '수', '목', '금', '토'];
        const day = week[today.getDay()];

        const thisDate = document.getElementById('today');
        thisDate.innerHTML = `<span>${today.getFullYear()}</span>년 <span>${today.getMonth()+1}</span>월 <span>${today.getDate()}</span>일 <span>${day}</span>요일`;
    }
    //buildDay();


    //1. 시간 가져오기
    const clock = document.querySelector('#weather_time');

    function getTime() {
        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const seconds = date.getSeconds();
        clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}`: minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    function initClock() {
        getTime();
        setInterval(getTime, 1000);
    };

    //initClock();


    //1. 메인 타이틀 애니메이션
    //제이쿼리, 라이브러리 사용 가능합니다.
    $('#main_title').textyle({
        duration: 500,
        delay: 200,
        easing: 'linear',
        callback: function () {
            $(this).css({
                transform: 'translateY(0px) rotateY(360deg)'
            });
        }
    });
    $('#welcome').textyle({
        delay: 50
    });

    $('#main_title_backBox').stop().animate({
        transitionDuration: '4s',
        opacity: 1
    });


    //1. 서브타이틀/언더바
    const underBar = document.querySelector('#under_line');
    const conceptTitle = document.querySelector('#concept_title');

    function underBarAnimation() {
        if (window.innerWidth >= 1280) {
            underBar.style.width = '39.8%';
        }

        conceptTitle.style.opacity = 1;
        if (window.innerWidth <= 1279) {
            underBar.style.width = '67.631%';
        }
    }

    //underBarAnimation();


    //1. 날씨/온도 가져오기
    const weather = document.querySelector('#weather');
    const temp = document.querySelector('#temperature');

    const API_KEY = '72199ca3fcddc302432b1284e53b473e';

    const COORDS = 'coords';

    function getWeather(lat, lng) {
        //API로 날씨 데이터 받기.
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        ).then(function (response) {
            return response.json();
        }).then(function (json) {
            const temperature = json.main.temp;
            const icon = json.weather[0].icon;
            temp.innerHTML = `${Math.floor(temperature)}&#176;c`
            weather.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="" />`;
        });
    }

    function saveCoords(coordsObj) {
        //브라우저에 전달받은 좌표값 저장.
        localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    }

    function handleGeoSucces(position) {
        //좌표 데이터를 받았을 때.
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coordsObj = {
            latitude: latitude,
            longitude: longitude
        }

        saveCoords(coordsObj);
        getWeather(latitude, longitude);
    }

    function handleGeoError() {
        //좌표 얻기 실패했을 때.
        alert('날씨 데이터에 필요한 좌표를 전달받지 못했습니다.');
    }

    function askForCoords() {
        //위치값 받기. alert 창 띄움.
        navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
    }

    function loadCoords() {
        //브라우저에 저장된 좌표값 가져오기.
        const loadedCoords = localStorage.getItem(COORDS);
        if (loadedCoords === null) {
            askForCoords();
        } else {
            const parsedCoords = JSON.parse(loadedCoords);
            getWeather(parsedCoords.latitude, parsedCoords.longitude);
        }
    }

    function initWeather() {
        loadCoords();
        setInterval(loadCoords, 10000);
    }

    //initWeather();


    //1. 타이틀 배경이미지 변경
    const bgImages = document.getElementsByTagName('header');

    const IMG_NUMBER = 8;

    function paintImages(imgNumber) {
        //배경 이미지
        bgImages[0].style.backgroundImage = `url(header/${imgNumber+1}.jpg)`;
        picName(imgNumber);
    }

    function picName(name) {
        //이미지 저작권자
        const picMaster = document.getElementById('pic_master');

        const photoName = ['Keila Hötzel', 'Sarah Shaffer', 'Holly Stratton', 'Susie Ho', 'India Tupy', 'Wendy Rake', 'Karlis Dambrans', 'Marek Levák'];

        for (let i = 0; i < photoName.length; i++) {
            if (name === i) {
                picMaster.innerHTML = `Photo by <span>${photoName[i]}</span> on Unsplash`;
            }
        }
    }

    function genNumber() {
        const number = Math.floor(Math.random() * IMG_NUMBER);
        return number;
    }

    function initImages() {
        const randomNumber = genNumber();
        paintImages(randomNumber);
    }

    function initBg() {
        setTimeout(function () {
            setInterval(initImages, 5000);
        }, 6500);
    }

    //initBg();

    function initFirst() {
        buildDay(); //1.
        initClock(); //1.
        underBarAnimation(); //1.
        if(window.innerWidth  >= 1280){
            initWeather(); //1.
        }
        initBg(); //1.
    }

    initFirst();

    //3.  section skill start -----------------------------------------------------;

    //3. section skill circle_chart

    const circle = document.getElementsByClassName('circle');

    function draw(max, classname) {
        let i = 0;
        const drawing = setInterval(function () {
            if (i < max) {
                drawColor(i, classname);
                i++;
            } else {
                clearInterval(drawing);
            }
        }, 10);
    }

    function drawColor(i, classname) {
        classname.style.background = `conic-gradient(#fdfdfd 0% ${i}%, transparent ${i}% 100%)`
    }

    function initCircle() {
        draw(58, circle[0]);
        draw(51, circle[1]);
        draw(66, circle[2]);
        draw(76, circle[3]);
    }

    //initCircle();



    function getCurrentScrollPercentage() {
        return (window.scrollY + window.innerHeight) / document.body.clientHeight * 100;
    }


    var testCount = 0;
    document.addEventListener('scroll', () => {
        const currentScrollPercentage = getCurrentScrollPercentage();
        const test = document.getElementById('test');
        if (window.innerWidth >= 1280) {
            if (currentScrollPercentage > 52 && testCount === 0) {
                initCircle(); //3.
                testCount = 1;
            }
        } else if (window.innerWidth >= 760) {
            if (currentScrollPercentage > 50 && testCount === 0) {
                initCircle(); //3.
                testCount = 1;
            }
        } else if (window.innerWidth <= 759){
            if(testCount === 0) {
                initCircle();
                testCount = 1;
            } 
        }
        
        if (testCount === 1) {
            return;
        }
    });





}
