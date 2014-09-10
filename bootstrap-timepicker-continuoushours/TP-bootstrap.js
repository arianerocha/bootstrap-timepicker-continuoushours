/**
 * Created by ariane on 10/09/2014.
 * __email__ = arianedematos@gmail.com
 */

(function ($, window, document, undefined) {

    var _super = $.fn.timepicker;

    $.extend(_super.defaults, {
        isContinuousHours: false
    });
    function TimePicker(element, options) {
        this.isContinuousHours = options.isContinuousHours;
        _super.Constructor.apply(this, arguments);
    };

    TimePicker.prototype = $.extend({}, _super.Constructor.prototype, {
        constructor: TimePicker,

        _super: function () {
            var args = $.makeArray(arguments);
            _super.Constructor.prototype[args.shift()].apply(this, args);
        },
        incrementHour: function () {
            if (this.showMeridian) {
                if (this.hour === 11) {
                    this.hour++;
                    return this.toggleMeridian();
                } else if (this.hour === 12) {
                    this.hour = 0;
                }
            }
            if (this.hour === 23 && !this.isContinuousHours) {
                this.hour = 0;
                return;
            }
            this.hour++;
            this.update();
        },
        decrementHour: function () {
            if (this.showMeridian) {
                if (this.hour === 1) {
                    this.hour = 12;
                } else if (this.hour === 12) {
                    this.hour--;

                    return this.toggleMeridian();
                } else if (this.hour === 0) {
                    this.hour = 11;

                    return this.toggleMeridian();
                } else {
                    this.hour--;
                }
            } else {
                if (this.hour === 0) {
                    if (this.isContinuousHours) {
                        this.hour = 0;
                    } else {
                        this.hour = 23;
                    }

                } else {
                    this.hour--;
                }
            }
            this.update();
        },
        setTime: function (time) {
            var arr,
                timeArray

            if (this.showMeridian) {
                arr = time.split(' ');
                timeArray = arr[0].split(':');
                this.meridian = arr[1];
            } else {
                timeArray = time.split(':');
            }

            this.hour = parseInt(timeArray[0], 10);
            this.minute = parseInt(timeArray[1], 10);
            this.second = parseInt(timeArray[2], 10);

            if (isNaN(this.hour)) {
                this.hour = 0;
            }
            if (isNaN(this.minute)) {
                this.minute = 0;
            }

            if (this.showMeridian) {
                if (this.hour > 12) {
                    this.hour = 12;
                } else if (this.hour < 1) {
                    this.hour = 12;
                }

                if (this.meridian === 'am' || this.meridian === 'a') {
                    this.meridian = 'AM';
                } else if (this.meridian === 'pm' || this.meridian === 'p') {
                    this.meridian = 'PM';
                }

                if (this.meridian !== 'AM' && this.meridian !== 'PM') {
                    this.meridian = 'AM';
                }
            } else {
                if (this.hour >= 24 && !this.isContinuousHours) {
                    this.hour = 23;
                } else if (this.hour < 0) {
                    this.hour = 0;
                }
            }

            if (this.minute < 0) {
                this.minute = 0;
            } else if (this.minute >= 60) {
                this.minute = 59;
            }

            if (this.showSeconds) {
                if (isNaN(this.second)) {
                    this.second = 0;
                } else if (this.second < 0) {
                    this.second = 0;
                } else if (this.second >= 60) {
                    this.second = 59;
                }
            }

            this.update();
        }

    });

    //TIMEPICKER PLUGIN DEFINITION
    $.fn.timepicker = $.extend(function (option) {

        var args = Array.apply(null, arguments),
            option = args.shift();

        return this.each(function () {

            var $this = $(this),
                data = $this.data('timepicker'),
                options = typeof option === 'object' && option;

            if (!data) {
                $this.data('timepicker', (data = new TimePicker(this, $.extend({}, $.fn.timepicker.defaults, options, $(this).data()))));
            }

            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });

    }, $.fn.timepicker);

    window.TimePicker = TimePicker;


}(jQuery, window, document));