/** @license MIT License (c) copyright 2011-2013 original author or authors */

/*jshint sub:true*/

/**
 * wire-invoke
 * Javascript IOC Container plugin
 *
 *
 * Licensed under the MIT License at:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @author Cesare Naldi
 * @version 0.1.0
 */
(function (define) {
	define([
		'when'
	], function (when) {
		"use strict";

		function asArray(it) {
			return Array.isArray(it) ? it : [it];
		}

		/**
		 * Factory that uses an AMD module either directly, or as a
	 	 * function to create the resulting item.
		 *
		 * @param {Object} resolver resolver to resolve with the created component
		 * @param {Object} componentDef portion of the spec for the component to be created
		 * @param {function} wire
		 */
		function invokeFactory (resolver, componentDef, wire) {

			var invoke, args, module, result;

			invoke = componentDef.options;
			args = invoke.args ? wire(asArray(invoke.args)) : [];

			if (typeof invoke == 'string') {
				module = wire.loadModule(invoke);
			} else if(wire.resolver.isRef(invoke)) {

				module = wire(invoke);
			}

			result = when.join(module, args).spread(function (module, args) {

				return module.apply(module, args)
			});

			resolver.resolve(result)
		}

		return function (/* options */) {
			
			return {
				factories: {
					invoke: invokeFactory
				}
			}
		}
	})
}(
	typeof define == 'function' && define.amd
		? define
		: function (deps, factory) { module.exports = factory.apply(this, deps.map(require)); }
));