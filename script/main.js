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

        /** Durations of animations */
        durations: {
            nameLetter: 2000,
            titleLetter: 1000,
            socialItem: 350
        },

        /** Delays before firing animations */
        delays: {
            initial: 250,
            name: 0,
            title: 750,
            nameLetter: 100,
            titleLetter: 50,
            social: -1000,
            socialItem: 100
        },

        initialize: function() {
            var self = this;

            setTimeout(function() {
                self.startAnimations();
            }, this.delays.initial);

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
                var timeout = i * self.delays.nameLetter + self.delays.name + self.delays.initial;
                setTimeout(function() {
                    self.drawNameLetter(letterPath);
                }, timeout);
            });

            return this;
        },

        /** Draw the title SVG */
        drawTitle: function() {
            var self = this,
                title = document.getElementById('svg-title');

            each(title.childNodes, function(letterPath, i) {
                var timeout = i * self.delays.titleLetter + self.delays.title + self.delays.initial;
                setTimeout(function() {
                    self.drawTitleLetter(letterPath);
                }, timeout);
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
                socialItems = socialNav.getElementsByTagName('li'),
                nameAndTitleDuration = this.getNameAndTitleDuration();

            each(socialItems, function(item, i) {
                var timeout = i * self.delays.socialItem + self.delays.social + nameAndTitleDuration + self.delays.initial;
                setTimeout(function() {
                    self.showSocialItem(item);
                }, timeout);
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
        },

        /** Returns the total duration of the name and title animation */
        getNameAndTitleDuration: function() {
            var name = document.getElementById('svg-name'),
                title = document.getElementById('svg-title'),
                nameLength = name.childNodes.length,
                titleLength = title.childNodes.length,
                nameDuration = this.delays.name + this.durations.nameLetter + this.delays.nameLetter * nameLength,
                titleDuration = this.delays.title + this.durations.titleLetter + this.delays.titleLetter * titleLength;

            return Math.max(nameDuration, titleDuration);
        }
    };

})();

app.initialize();
