const AudioSync = {
    load: () => aux.paused ? aux.play() | console.log('aux:1', 'played') : aux.pause() | console.log('aux:1', 'paused'),
    seek: () => (aux.currentTime += aux.currentTime + 5) | console.log('aux:2', 'seek'),
    prev: () => {
        aux.pause()
        setTimeout(() => aux.play(), 800)
        if (!lyrics.el.childElementCount) {
            console.log('aux:3', 'reversed(5)')
            return aux.currentTime -= 5;
        }
        var dt = lyrics.el.lastElementChild.getAttribute('start-time')
        lyrics.el.lastElementChild.remove()
        console.log('aux:3', 'reversed(' + dt + ')')
        return aux.currentTime = Number(dt) - 5
    },
    next: () => {
        var el = document.createElement('span')
        var log = 'walk(';
        if (lyrics.el.childElementCount) {
            lyrics.el.lastElementChild.setAttribute('end-time', aux.currentTime)
            log += lyrics.el.childElementCount;
        }
        el.setAttribute('start-time', aux.currentTime.toFixed(2))
        el.textContent = lyrics.data[lyrics.el.childElementCount]
        lyrics.el.append(el)
        console.log('aux:4', log + ')')
        return scroll(0, lyrics.el.scrollHeight)
    }
}

function listenKeyEvent() {
    switch (event.keyCode || event.charCode) {

        case 32: // key(whitespace)
        case 75: // char(K)
        case 107: // char(k)
            return AudioSync.load();

        case 76: // char(L)
        case 108: // char(l)
            return AudioSync.seek()

        case 74: // char(J)
        case 106: // char(j)
            return AudioSync.prev()

        case 13: //key(enter)
            return AudioSync.next()
    }

    console.error('uncaught event', event);
}