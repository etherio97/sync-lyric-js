let synced, actived;

const aux = new Audio('audio/kyal_kalay-ywar-wa-na.mp3')
const lyrics = {
    data: [],
    el: document.getElementById('lyric'),
}

const _anim = {
    show: function (el) {
        if (!el) return console.error('Undefined element cannot show');
        el.style.removeProperty('visibility');
        el.classList.remove('hide') | el.classList.add('show')
    },
    hide: function (el) {
        if (!el) return console.error('Undefined element cannot show');
        el.classList.remove('show') | el.classList.add('hide')
        setTimeout(() => el.style.setProperty('visibility', 'hidden'), 1200)
    }
}

aux.addEventListener('play', () => synced = setInterval(auxPlayed, 800))
aux.addEventListener('pause', () => auxPlayed() | clearInterval(synced))
aux.addEventListener('ended', () => clearInterval(synced))

fetch('audio/kyal-ka-lay.txt')
    .then(res => res.text())
    .then(data => data.toString())
    .then(lyric => lyrics.data = lyric.split("\n"))
    .then(function () {
        _anim.hide(document.getElementById('preload'))
        window.addEventListener('keypress', listenKeyEvent)
        window.addEventListener('touchstart', function () {
            actived = { state: 1, touched: null, moved: null }
        })
        window.addEventListener('touchmove', function (event) {
            var prev = actived.touched || { screenX: 0, screenY: 0 };
            actived.state = 0
            actived.touched = event.changedTouches[0]
            actived.moved = [actived.touched.screenX - prev.screenX, actived.touched.screenY - prev.screenY]
        })
        window.addEventListener('touchend', function () {
            if (!actived.state) {
                if (actived.moved[0] > 6) return AudioSync.seek() | console.log('touch:1', 'F');
                if (actived.moved[0] < -6) return AudioSync.prev() | console.log('touch:1', 'B');
                if (actived.moved[1] > 4) return AudioSync.load() | console.log('touch:1', 'D');
                if (actived.moved[1] < -4) return AudioSync.load() | console.log('touch:1', 'U');
                return AudioSync.next() | console.log('touch:1', 'U');
            }
            console.log('touched:2', 'U')
            return aux.paused ? aux.play() : AudioSync.next();
        })
    })

function auxPlayed() {
    var { duration, currentTime } = aux
    var loaded = (currentTime / duration) * 100

    document.getElementById('timer').style.width = loaded.toFixed(2) + '%'
}
