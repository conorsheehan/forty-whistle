var app = (function($) {

    return {
        initialize: function() {
            var self = this;
            $(document).ready(function() {
                setTimeout(function() {
                    self.startAnimations();
                }, 250);
            });

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
                $name = $('.svg-name'),
                i = 0;

            $name.find('path').each(function() {
                var letterPath = this;
                setTimeout(function() {
                    self.drawPath(letterPath);
                }, i * 150 + 250);

                i += 1;
            });

            return this;
        },

        /** Draw the title SVG */
        drawTitle: function() {
            var $title = $('.svg-title'),
                i = 0;

            $title.find('path').each(function() {
                var letterPath = this;
                setTimeout(function() {
                    $(letterPath).attr('class', 'shown');
                }, i * 100 + 1000);

                i += 1;
            });

            return this;
        },

        /** Draw the stripes */
        drawStripes: function() {
            $('.stripes .stripe').addClass('shown');
            return this;
        },

        /** Social all the social links */
        showAllSocialLinks: function() {
            var self = this,
                i = 0;

            $('.social li').each(function() {
              var link = this;
              setTimeout(function() {
                self.showSocialLink(link);
              }, i * 100 + 3500);

              i++;
            });

            return this;
        },

       /**
        * Draw a path
        * Will draw the stroke if the path has a stroke
        * Also sets the path to .shown
        */
        drawPath: function(path) {
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
            $(path).attr('class', 'shown');

            return this;
        },

        /** Show a single social link */
        showSocialLink: function(link) {
            $(link).addClass('shown');
            return this;
        }
    };

})($);

app.initialize();
