/**
 * define primitive functions
 */
define(["jquery"], function(a) {
    return {returnTrue: function() {
        return !0
    },returnFalse: function() {
        return !1
    },returnEmptyObject: function() {
        return {}
    },returnResolvedPromise: function() {
        return (new a.Deferred).resolve().promise()
    },returnRejectedPromise: function() {
        return (new a.Deferred).reject().promise()
    }}
});
