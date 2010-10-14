The jquery-datastore
====================

datastore basics
----------------

The jquery-datastore is a very useful tool for many reasons.

Data is stored and retrieved using $.data:
<pre>
$(el).data('favorite-chocolate', 'Lindt');
// ... later
console.log("My favorite chocolate is " + $(el).data('favorite-chocolate'));
</pre>

Note that any data can be stored in the datastore. 

namespacing keys
----------------

Suppose you are writing a plugin called 'foo' and you decide to store your data in the jquery datastore.  A useful feature of the datastore is to namespace your keys.  This helps prevent name clashes among plugins, and has several other features described below.

Namespacing is accomplished by suffixing your key with the namespace.  Since our plugin is called 'foo', we use 'bar.foo' to namespace the key, 'bar'.

<pre>
$(el).data('bar.foo', 2);
$(el).data('baz.foo', 3);
</pre>

additional namespace benefits
-----------------------------

In addition to preventing name clashes among plugins, namespacing datastore keys allows us to bind special event handlers that get called when data for our plugin is accessed or mutated.  The events are 'getData.#{plugin}', 'setData.#{plugin}', and 'changeData.#{plugin}'.

Binding a handler to setData allows us to see what value a user tried to store in the datastore.  Binding a handler to getData allows us to see when a user attempts to retrieve data from the datastore, and have the option to have the user receive a different value.  Binding a handler to changeData allows us to react to data being changed in the datastore.

<pre>
$(el).bind('changeData.foo', function(x, key, val) {
    // this function is called whenever a 'foo' namespaced value is changed
    // in the datastore of x.  In this case, x is either $(el), or a member
    // of the collection el.
});
</pre>

finally, the dump plugin
========================

This plugin allows you to more easily interact with data in the datastore.  This is most useful when using a namespace.

dump
----
<pre>
$(el).dump()
</pre>
returns a shallow copy of el's data in the datastore.

If el is not a single element, but rather a collection of elements, this function returns an array of shallow copies of data in the datastore.

dump(name)
----------
<pre>
$(el).dump(name)
</pre>
returns a shallow copy of el's data in the datastore under the namespace name. 

For example, suppose
<pre>
$(el).data() === {
    "name": "Mark",
    "age": 22,
    "bar.foo": [1,2,3],
    "baz.foo": {a: 2, b: 3},
    "jon.foo": null,
    "whats.so": {"fuck": "then"}
};
</pre>

then:
<pre>
$(el).dump('foo') === {
    "bar": [1,2,3],
    "baz": {a: 2, b: 3},
    "jon": null
};
</pre>

If $(el) is not a single element, but rather a collection of elements, this function returns an array of shallow copies of the data in the datastore under the namespace name.

dump(name, data)
----------------

This plugin also allows you to put data into the datastore with a namespace.
<pre>
$(el).dump('foo', {'bar': 2, 'baz': "ok"});
</pre>
writes bar.foo=2 and baz.foo="ok" to $(el)'s datastore.

dump("", data)
--------------

Similar to dump(), this allows you to use the dump plugin without a namespace.  This writes each key: value in data to the datastore.

<pre>
$(el).dump("", {a:2, b:3});
</pre>
writes a=2 and b=3 to $(el)'s datastore.

dump(name, data, options)
-------------------------

The accepted options are 'only', 'except', and 'array'.

options.only is an array which indicates which elements of data should be written to the datastore.
<pre>
$(el).dump("circuit", {
    i: 2,
    j: 3,
    k: 10,
    type: 12,
    t: true,
    f: null 
}, {only: ["i", "j", "k"]});
</pre>
writes i.circuit=2, j.circuit=3, and k.circuit=10 to $(el)'s datastore.

Similarly, options.except is an array which indicates which elements of data should NOT be written to the datastore.

<pre>
$(el).dump('foo', null, {array: true});
</pre>
options.array=true indicates that even if $(el) is a single element, the data dumped should be returned as an array.

