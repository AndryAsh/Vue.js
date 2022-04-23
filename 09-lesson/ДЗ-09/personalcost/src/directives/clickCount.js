Vue.directive('click-count', {
    bind: function (el) {
        let clickCount = 0;
        el.clickEvent = function (event) {
            if (el.contains(event.target)) {
                clickCount++;
                console.log(`${clickCount} clicked`);
            }
        };
        document.body.addEventListener('click', el.clickEvent);
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickEvent);
    },
})