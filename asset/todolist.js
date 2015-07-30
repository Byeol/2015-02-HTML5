/*
* todo 만들어 객체로 함수 묶기 //DONE
* ajax 요청
	- 전체 가져올 때 //DONE
	- 추가할 때 // DONE
	- 완료할 때
	- 삭제할 때
*/
var TODOSync = {
	address: "http://128.199.76.9:8002/KimDahye",

	get: function(callback) {
		var param = { method: "GET", url: this.address };
		$.ajax(param).then(callback, this.alertAjaxFail);
	},

	add: function(sTodo, callback) {
		var param = { method: "PUT", url: this.address, data: "todo=" + sTodo };
		$.ajax(param).then(callback, this.alertAjaxFail);
	},

	complete: function(oParam, callback) {
		var param = { method: "POST", url: this.makeUrl("/"+oParam.todoKey), data: "complete=" + oParam.complete, success}
	},

	remove: function() {},

	makeUrl: function(api) {
		return this.address + api; 
	},

	alertAjaxFail: function () { 
		alert("데이터 전송이 실패했습니다. 다시 시도해주세요.");
	}
};

var TODO = {
	init: function() {
		this.get();
		$("#new-todo").on("keydown", TODO.add.bind(this));
		var todoList = $("#todo-list");
		todoList.on("click", "input", TODO.complete);
		todoList.on("click", "button", TODO.startDeleteAnimation);
		todoList.on("animationend", "li", TODO.remove);
	},

	get: function() {
		TODOSync.get(function (json) {
			$.each(json, function(i, item) {
			    var todoList = this.makeTodoList(item.todo);
			    $(todoList).prependTo("#todo-list");
			}.bind(this));
		}.bind(this));
	},	

	add : function (ev) {
		var ENTER_KEYCODE = 13;
		if(ev.keyCode === ENTER_KEYCODE) {
			var sTodo = ev.target.value;
			
			TODOSync.add(sTodo, function(json) {
				var todoList = this.makeTodoList(sTodo);
				$("#todo-list").append(todoList);
				$("#new-todo").val("");
			}.bind(this));
		}
	},

	makeTodoList : function (sTodo) {
		var source = $("#todo-template").html();
		var template = Handlebars.compile(source);
		var context = {todoTitle: sTodo};
		return template(context);
	},

	complete : function (ev) {
		var input = ev.currentTarget;
		var li = input.parentNode.parentNode;
		if(input.checked === true) {
			li.className = "completed";
		}else {
			li.className = "";
		}
	},

	startDeleteAnimation : function (ev) {
		var button = ev.currentTarget;
		var li = button.parentNode.parentNode;
		li.className = "deleting";
	},

	remove : function (ev) {
		var li = ev.currentTarget;
		if(li.className === "deleting"){
			li.parentNode.removeChild(li);
		}
	}	
};

$(document).ready(function () {
	TODO.init();
});