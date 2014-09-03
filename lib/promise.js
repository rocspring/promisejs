/*
*@desp: Promise规范的实现
*@author: wshp
*@E-Mail: wshp000000@gmail.com
*@version: 0.1.0
**/

/*
1.实现一个then函数，添加执行的代码，并返回一个promise对象
2.实现一个done函数，执行这个promise对象
**/

(function (global) {
	
	/*
	*构造函数
	**/
	function Promise () {
		//保存一个promise对象的回调函数的
		this._callbacks = [];
	}

	/*
	*给一个promise添加回调函数
	*@param {} func
	*@param {Object} 
	*@return {Obejct} 返回一个Promise对象
	**/
	Promise.prototype.then = function( func, context ) {
		var source = context || global;

		var p = new Promise();

		this._callbacks.push( proxy( func, source ) );
		
		this._next = p;

		return p;
	};


	/*
	*执行一个promise的所有回调函数，这些回调函数都是平级的
	**/
	Promise.prototype.done = function () {

		var i, len = this._callbacks.length;

		for( i = 0; i <len; i++ ){
			this._callbacks[i].apply(this);
		}

		//执行下一个promise的回调
		if (this._next) {
			this._next.done();
		}
		
	};


	global.Promise = Promise;

	/************功能函数*************/
	function  proxy ( fun, context ) {
		var source = context || this;

		return fun.bind ?  fun.bind(source) : function () {
			fun.apply(source, arguments);
		};
	}

	function type ( obj ){
		var o = {};
		return o.prototype.toString.call( obj ).replace( /^\[ Object (\w+)\]$/, '$1' ).toLowerCase();
	}

	function isFunc( obj ){
		return type(obj) === 'function';
	}

	function isArr ( obj ){
		return type(obj) === 'array';
	}

})(window);