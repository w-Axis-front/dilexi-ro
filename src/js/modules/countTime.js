export default function countTime() {
    const DEADLINE = new Date(Date.parse(new Date()) + 6 * 60 * 60 * 1000);
    const INTERVAL = 1000; // ms
    const clock = document.getElementById("countdown");
    // const daysSpan = clock.querySelector('.days');
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');

    function getTimeRemaining(endtime) {
        let t;
        if (!endtime.total) {
            t = Date.parse(endtime) - Date.parse(new Date());
        } else {
            t = endtime.total - INTERVAL;
        }

        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const remindedTimeObg = {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
        localStorage.setItem("remindedTimeDilexi", JSON.stringify(remindedTimeObg));
        if (remindedTimeObg.total > 999) {
            hoursSpan.innerHTML = ('0' + remindedTimeObg.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + remindedTimeObg.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + remindedTimeObg.seconds).slice(-2);
        } else {
            // daysSpan.innerHTML = '00';
            hoursSpan.innerHTML = '00';
            minutesSpan.innerHTML = '00';
            secondsSpan.innerHTML = '00';
        }
        return remindedTimeObg;
    }

    function initializeClock() {
        let remindedTime;
        if (localStorage && localStorage.getItem("remindedTimeDilexi")) {
            remindedTime = JSON.parse(localStorage.getItem("remindedTimeDilexi"));
        } else {
            remindedTime = DEADLINE;
        }
        let t = getTimeRemaining(remindedTime);
        let expected = Date.now() + INTERVAL;
        setTimeout(step, INTERVAL);

        function step() {
            const dt = Date.now() - expected; // the drift (positive for overshooting)
            if (dt > INTERVAL) {
                // console.log('overshooting');
                // something really bad happened. Maybe the browser (tab) was inactive?
                // possibly special handling to avoid futile "catch up" run
            }
            t = getTimeRemaining(t);
            if (t.total > 999) {
                expected += INTERVAL;
                setTimeout(step, Math.max(0, INTERVAL - dt)); // take into account drift
            }
        }
    }

    initializeClock();
}