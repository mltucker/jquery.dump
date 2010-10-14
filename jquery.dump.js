/**
 * dump jQuery plugin 1.0
 *
 * Copyright 2010, Mark Tucker
 * Licensed under the MIT
 * http://jquery.org/license
 *
 * Date: Mon Sep 20 11:24:29 CDT 2010
 **/
(function($) {
    /**
     * $(el).dump() =>
     *   Return a copy of $(el).data()
     *
     * $(el).dump(name) =>
     *   Return a copy of all $(el).data() for which the key is
     *   foo.#{name}.
     *
     * $(el).dump(name, data) =>
     *   Write each key->value in data to $(el).data("key.#{name}").
     *
     * $(el).dump("", data) =>
     *   Write each key->value in data to $(el).data("key").
     *
     * $(el).dump(name|"", data, {only: keys=[key1, key2, ...]}) =>
     *   Same as above, except only use key->value where key in keys.
     *
     * $(el).dump(name|"", data, {except: keys=[key1, key2, ...]}) =>
     *   Same as above, except only use key->value where key not in keys.
     **/
    $.fn.dump = function(name, data, options) {
	var $this = this;
	if (data) {
	    if (options && options.only) {
		$.each(data, function(key, val) {
		    if ($.inArray(key, options.only) !== -1) {
			var ns = name ? key + '.' + name : key;
			$this.data(ns, val);
		    }
		});
	    } else if (options && options.except) {
		$.each(data, function(key, val) {
		    if ($.inArray(key, options.except) === -1) {
			var ns = name ? key + '.' + name : key;
			$this.data(ns, val);
		    }
		});
	    } else {
		$.each(data, function(key, val) {
		    var ns = name ? key + '.' + name : key;
		    $this.data(ns, val);
		});
	    }
	} else {
	    if (this.length === 0) {
		return null;
	    } else if (this.length === 1) {
		var data = this.data();
		
		if (name) {
		    var relevant = {};
		    var names = name.split(' ');

		    $.each(data, function(key, val) {
			for (var i = 0; i < names.length; i++) {
			    var ni = names[i];
			    var ns = '.' + ni;
			    if (key.slice(-ni.length - 1) === ns) {
				relevant[key.slice(0, -ni.length - 1)] = val;
				return;
			    }
			}
		    });
		    if (options && options.array) {
			return [relevant];
		    } else {
			return relevant;
		    }
		} else {
		    if (options && options.array) {
			return [$.extend({}, data)];
		    } else {
			return $.extend({}, data);
		    }
		}
	    } else {
		return $.map(this, function(x) {
		    var data = $(x).data();
		    
		    if (name) {
			var relevant = {};
			var names = name.split(' ');
			    
			$.each(data, function(key, val) {
			    for (var i = 0; i < names.length; i++) {
				var ni = names[i];
				var ns = '.' + ni;
				
				if (key.slice(-ni.length - 1) === ns) {
				    relevant[key.slice(0, -ni.length - 1)] = val;
				    return;
				}
			    }
			});
			
			return relevant;
		    } else {
			return $.extend({}, data);
		    }
		});
	    }
	}
    };
})(jQuery);
