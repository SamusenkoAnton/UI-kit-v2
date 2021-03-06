var s = document.createElement('style'),
    r = document.querySelectorAll('input[type=range]'),
    n_r = r.length,
    styles = [],
    pp = ['-webkit-slider-runnable-', '-moz-range-'],
    n_pp = pp.length;

document.body.appendChild(s);

var getFillStyle = function(el) {
    var str = '',
        id = el.id,
        min = el.min || 0,
        perc = (el.max) ? ~~(100*(el.value - min)/(el.max - min)) : el.value,
        val = '', style, w, h, sw, sh, r;

    if(el.classList.contains('fill--2')) {
        style = getComputedStyle(el);
        w = ~~style.width.split('px')[0];
        h = ~~style.height.split('px')[0];
        sw = (w - h)/4;
        sh = h/2 - 2;

        val += sw + 'px ' + sh + 'px,';

        if(el.classList.contains('numbered')) {
            str += '.js #' + id + '/deep/ #track:after{width:' + ~~(perc*w/100) + 'px}';
        }
    }

    val += val + perc + '% 100%';

    for(var j = 0; j < n_pp; j++) {
        str += '.js #' + id + '::' + pp[j] + 'track{background-size:' + val + '}';
    }

    return str;
};

var getTipStyle = function(el) {
    var id = el.id, val = el.value,
        str = '.js #' + id + ' /deep/ #thumb:after{content:"' + val + '"}';

    return str;
};

for(var i = 0; i < n_r; i++) {
    styles.push('');

    r[i].addEventListener('input', function() {
        var idx = this.id.split('r')[1];

        if(this.classList.contains('fill')) {
            styles[idx] = getFillStyle(this);
        }
        else {
            styles[idx] = '';
        }

        if(this.classList.contains('tip')) {
            styles[idx] += getTipStyle(this);
        }

        s.textContent = styles.join('');
    }, false);
}