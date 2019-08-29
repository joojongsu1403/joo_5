function getStyle(elem, name) {
            if (elem.style[name]) {
                return elem.style[name];
            } else if (document.defaultView && document.defaultView.getComputedStyle) {
                name = name.replace(/([A-Z])/g, "-$1");
                name = name.toLowerCase();

                var s = document.defaultView.getComputedStyle(elem, "");
                return s && s.getPropertyValue(name);
            }
        }