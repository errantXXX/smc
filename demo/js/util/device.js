define(["util/local-storage"], function(a) {
    !function() {
        if (a.isSupported()) {
            var b = "differentDeviceRatio", c = "1";
            if (window.deviceRatio !== window.displayInitialize()) {
                var d = a.get(b);
                if (d !== c)
                    return a.set(b, c), void window.location.reload()
            }
            a.remove(b)
        }
    }()
});
