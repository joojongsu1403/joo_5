function swipeTouch(move, left, right, frame) {

    const len = move.children;

    let startingX;

    let passiveSupported = false;


    //touch 이벤트 수동으로 변환. MDN에서 가져옴. 안할 시 크롬에서 사용 위반 경고 뜸.
    //작동원리는 아직 잘 모르겠음.
    try {
        var options = {
            get passive() { // This function will be called when the browser
                //     attempts to access the passive property.
                passiveSupported = true;
            }
        };

        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
    } catch (err) {
        passiveSupported = false;
    }

    // 터치이벤트 구역.
    for (let i = 0; i < len.length; i++) {

        len[i].style.transition = 'all .3s';

        //터치 시작점.
        len[i].addEventListener('touchstart', function (e) {
            const next = this.nextSibling.nextSibling;
            const prev = this.previousSibling.previousSibling;
            if (e.type === 'touchstart' && e.touches.length === 1) {
                startingX = e.touches[0].screenX;
            };
        }, passiveSupported ? {
            passive: true
        } : false);

        //터치 후 움직임.
        len[i].addEventListener('touchmove', function (e) {
            if (e.type === 'touchmove' && e.touches.length === 1) {
                const next = this.nextSibling.nextSibling;
                const prev = this.previousSibling.previousSibling;

                const touch = e.touches[0];

                const changeNext = startingX - touch.screenX; //터치시작점에서 왼쪽으로 조작할때.
                const changePrev = touch.screenX - startingX; //터치시작점에서 오른쪽으로 조작할때.
                var webScreen = document.getElementById('select_frame');
                if (changeNext > 0) {
                    //right
                    if (next) {
                        this.style.left = '-' + changeNext + 'px';
                    }
                } else if (changeNext < 0) {
                    //left
                    if (prev) {
                        this.style.left = changePrev + 'px';
                    }
                } else {
                    return;
                }
            }
        }, passiveSupported ? {
            passive: true
        } : false);

        //터치 후 손가락 떼는 지점.
        len[i].addEventListener('touchend', function (e) {
            if (e.type === 'touchend' && e.touches.length === 0) {
                const next = this.nextSibling.nextSibling;
                const prev = this.previousSibling.previousSibling;

                const change = startingX - e.changedTouches[0].screenX;
                const threshold = screen.width / frame; // 움직인 후 반응 결정 기준.

                if (change > 0) {
                    // 오른쪽 화면 가져올 때 관련 내용.
                    if (Math.abs(change) < threshold) {
                        // semi right, threshold 보다 움직임이 적을 때. 움직임 초기화.
                        if (next) {
                            this.style.left = 0;
                        }
                    } else if (Math.abs(change) > threshold) {
                        // right, 움직임 확정.
                        if (next) {
                            this.style.left = 0;
                            right();
                        }
                    }
                } else if (change < 0) {
                    // 왼쪽 화면 가져올 때 관련 내용.
                    if (Math.abs(change) < threshold) {
                        // semi left, threshold 보다 움직임이 적을 때. 움직임 초기화.
                        if (prev) {
                            this.style.left = 0;
                        }
                    } else if (Math.abs(change) > threshold) {
                        // left, 움직임 확정.
                        this.style.left = 0;
                        if (prev) {
                            this.style.left = 0;
                            left();
                        }
                    }
                }
            }

            startingX = 0;
        }, passiveSupported ? {
            passive: true
        } : false);
    }
}