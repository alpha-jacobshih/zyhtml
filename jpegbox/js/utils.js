/*
 * utils.js
 * 
 * utilities.
 * 
 * @author jacob_shih
 * @date 12/09/2016 15:02:05
 * 
 */

/**
 * get the time duration.
 * 
 * @function diff()
 *  calculate the duration since the instance created.
 *  
 * @example
 *  var td = new TimeDuration();
 *  // do something
 *  var elapse = td.diff(); // elapse time while doing something.
 *
 */
function TimeDuration() {
    this.start = new Date();
}

TimeDuration.prototype.diff = function() {
    var now = new Date();
    return now.getTime() - this.start.getTime();
};

