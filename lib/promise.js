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
		//成功时，执行的回调函数队列
		this.resolves = [];
		//失败时，执行的回调函数队列
		this.rejects = [];
		this.status = 'pending';
	}

	/*
	*给一个promise添加成功和失败回调函数
	*@param {Function} 
	*@param {Function} 
	*@return {Obejct} 返回一个新的Promise对象
	**/
	Promise.prototype.then = function ( resolve, reject ) {

		//把需要执行的回调函数放入不同的队列中
		if ( this.status === 'resolved' ) {
			if () { // 同步操作
				resolve.apply( this, arguments );
			} else{ // 异步操作
				this.resolves.push( resolve );
			}
		}

		if ( this.status === 'rejected' ) {
			if () { // 同步操作
				reject.apply( this, arguments );
			} else{ // 异步操作
				this.rejects.push( reject );
			}
		}
		
		return this;
	};


	/*
	*成功时执行的方法
	**/
	Promise.prototype.resolve = function ( arguments ) {
		this._status = 'resolved';

		var i = 0,
			len = this.resolves.length;

		for ( ; i < len; i++ ){
			resolves[i].apply( null, arguments );
		}

	};

	/*
	*失败时执行的方法
	**/
	Promise.prototype.reject = function ( arguments ) {
		this._status = 'rejected';

		var i = 0,
			len = this.rejects.length;

		for ( ; i < len; i++ ){
			rejects[i].apply( null, arguments );
		}
	};

	global.Promise = Promise;
	

	/****************功能函数*********************/
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