/*
*@desp: Promise规范的实现
*@author: wshp
*@E-Mail: wshp000000@gmail.com
*@version: 0.1.0
**/

/*
*1.实现一个then函数，并返回一个promise对象
*2.promise对象暂时有两个状态，pending(初始状态) 、resolved(执行成功的状态)、rejected(执行失败的状态)
*3.实现一个resolve方法和reject方法
**/

(function (global) {
	
	/*
	*构造函数
	**/
	function Promise () {
		// 成功时，执行的回调函数队列
		this._resolves = [];
		// 失败时，执行的回调函数队列
		this._rejects = [];

		//promise对象队列
		this._list = ( arguments.length === 0 ) ? [this] : Array.prototype.concat.apply( [], arguments[0] );

		this.status = 'pending';
	}

	/*
	*给一个promise添加成功和失败回调函数
	*@param {Function} 
	*@param {Function} 
	*@return {Obejct} 返回一个新的Promise对象
	**/
	Promise.prototype.then = function ( resolve, reject ) {

		var list = this._list,
			i = 0,
			len = list.length,
			isAllResloved = false,
			isAllRejected = true;

		for ( ; i < len; i++ ){
			if( list[i].status === 'resolved' ){
				isAllResloved = true;
			}else{
				isAllResloved = false;
			}
		}

		isAllRejected = isAllResloved ? false : true;

		// 把需要执行的回调函数放入不同的队列中
		if ( this.status === 'pending' ) {
			this._resolves.push( resolve );
			this._rejects.push( reject );
		} 

		if ( isAllResloved ) {
			if ( typeof resolve === 'function' ) { // 同步操作
				resolve.apply( null );
			} else{ // 异步操作
				this._resolves.push( resolve );
			}
		} 

		if ( isAllRejected ) {
			if ( typeof resolve === 'function' ) { // 同步操作
				reject.apply( null );
			} else{ // 异步操作
				this._rejects.push( reject );
			}
		}

		return this;
	};


	/*
	*成功时执行的方法
	**/
	Promise.prototype.resolve = function ( ) {
		var list = this._list,
			j = 0,
			listLen = list.length,
			isResolved = false;

		for ( ; j < listLen; j++ ){
			if ( list[j].status !== 'resolved' ) {
				isResolved = false;
			}
		}

		this.status = 'resolved';

		if (!isResolved) return;

		var i = 0,
			len = this._resolves.length;

		for ( ; i < len; i++ ){
			this._resolves[i].apply( null );
		}

	};

	/*
	*失败时执行的方法
	**/
	Promise.prototype.reject = function ( ) {

		var list = this._list,
			j = 0,
			listLen = list.length,
			isRejected = false;

		for ( ; j < listLen; j++ ){
			if ( list[j].status === 'rejected' ) {
				isRejected = true;
			}else{
				list[j].status = 'rejected'; 
			}	
		}

		this.status = 'rejected';

		if (isRejected) return;

		var i = 0,
			len = this._rejects.length;

		for ( ; i < len; i++ ){
			this._rejects[i].apply( null );
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