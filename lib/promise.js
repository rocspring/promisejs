/*
*@desp: Promise规范的实现
*@author: wshp
*@E-Mail: wshp000000@gmail.com
*@version: 0.1.0
**/

/*
1.实现一个then函数，添加执行的代码，并返回一个promise对象
2.promise对象暂时有两个状态，pending(初始状态) 、resolved(执行成功的状态)、rejected(执行失败的状态)
**/

(function (global) {
	
	/*
	*构造函数
	**/
	function Promise () {
		//保存一个promise对象的回调函数的
		this._callbacks = [];
		this._status = 'pending';
	}

	/*
	*给一个promise添加成功和失败回调函数
	*@param {Function} 
	*@param {Function} 
	*@return {Obejct} 返回一个新的Promise对象
	**/
	Promise.prototype.then = function ( resolve, reject ) {

		//判断状态，执行不同的回调
		

		return this;
	};


	/*
	*执行成功的状态
	**/
	Promise.prototype.resolve = function ( res ) {
		
		this._status = 'resolved';
	};

	/*
	*执行拒绝的状态
	**/
	Promise.prototype.reject = function ( res ) {

		this._status = 'rejected';
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
		return o.toString.call( obj ).replace( /^\[ Object (\w+)\]$/, '$1' ).toLowerCase();
	}

	function isFunc( obj ){
		return type(obj) === 'function';
	}

	function isArr ( obj ){
		return type(obj) === 'array';
	}

})(window);