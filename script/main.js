var app = (function() {

    "use strict";

    /**
     * Creates an each loop over an array.
     * Iteratee arguments: (value, key, list)
     * @param  {Array} arr
     * @param  {Function} func - Iteratee function
     */
    function each(arr, func) {
        for(var i=0; i<arr.length; i++) {
            func(arr[i], i, arr);
        }
    }

    return {
        initialize: function() {
            var self = this;

            setTimeout(function() {
                self.startAnimations();
            }, 250);

            return this;
        },

        /** Start the various animations on the page */
        startAnimations: function() {
            this.drawStripes()
                .drawName()
                .drawTitle()
                .showAllSocialLinks();

            return this;
        },

        /** Draw the name SVG */
        drawName: function() {
            var self = this,
                name = document.getElementById('svg-name');

            each(name.childNodes, function(letterPath, i) {
                setTimeout(function() {
                    self.drawNameLetter(letterPath);
                }, i * 150 + 250);
            });

            return this;
        },

        /** Draw the title SVG */
        drawTitle: function() {
            var self = this,
                title = document.getElementById('svg-title');

            each(title.childNodes, function(letterPath, i) {
                setTimeout(function() {
                    self.drawTitleLetter(letterPath);
                }, i * 100 + 1000);
            });

            return this;
        },

        /** Draw the stripes */
        drawStripes: function() {
            var stripes = document.getElementsByClassName('stripe');

            each(stripes, function(stripe) {
                stripe.classList.add('shown');
            });

            return this;
        },

        /** Social all the social links */
        showAllSocialLinks: function() {
            var self = this,
                socialNav = document.getElementById('social'),
                socialItems = socialNav.getElementsByTagName('li');

            each(socialItems, function(item, i) {
                setTimeout(function() {
                    self.showSocialItem(item);
                }, i * 100 + 3500);
            });

            return this;
        },

        /** Draw a single letter path in the title SVG */
        drawTitleLetter: function(letterPath) {
            letterPath.classList.add('shown');
        },

       /**
        * Draw a single letter path in the name SVG
        * Will draw the stroke if the path has a stroke
        */
        drawNameLetter: function(path) {
            var length = path.getTotalLength();
            // Clear any previous transition
            path.style.transition = path.style.WebkitTransition = 'none';
            // Set up the starting positions
            path.style.strokeDasharray = length + ' ' + length;
            path.style.strokeDashoffset = length;
            // Trigger a layout so styles are calculated & the browser
            // picks up the starting position before animating
            path.getBoundingClientRect();
            // Reset transition
            path.style.transition = path.style.WebkitTransition = '';
            // Go!
            path.style.strokeDashoffset = '';
            path.classList.add('shown');

            return this;
        },

        /** Show a single social item */
        showSocialItem: function(item) {
            item.classList.add('shown');
            return this;
        }
    };

})();

app.initialize();
