// 핸드바 템플릿을 이용하여 TODO 엘리먼트를 만드는 함수
function makeTODO(todo){
	var source   = document.getElementById("todo-template").innerHTML;
	var template = Handlebars.compile(source);
	var context = {todoName: todo};
	var todoTemplate = template(context);

	return todoTemplate;
}

// TODO를 추가하는 함수
function addTODO(e){
	var ENTER_KEYCODE = 13;
	if(e.keyCode === ENTER_KEYCODE){ // 엔터를 눌렀을 때 

		// todo내용을 입력받아 todo 추가하기
		var todo = makeTODO(document.getElementById("new-todo").value);

		document.getElementById("todo-list").insertAdjacentHTML('beforeend', todo);
		
		// todo입력창에 쓴 내용 초기화 
		document.getElementById("new-todo").value = "";
	}
}

// TODO를 완료(toggle을 클릭)했을 때 li에 completed 클래스 추가하는 함수
function completedTODO(e){
	var input = e.target;
	var li = input.parentNode.parentNode;

	if(input.checked){
		li.className = "completed";
	} else {
		li.className = "";
	}
}

// TODO를 삭제할 때의 함수 
function removeTODO(e){
	var li = e.target.parentNode.parentNode;
	
	li.classList.add("deleting"); // 제대로 동작함
	
	setTimeout(function() {
        li.parentNode.removeChild(li);
    },1000);
}



// Timer로 만든 애니메이션을 css3을 활용하여 변경할 것.
// 	- css3에서 transition, transform, animation 공부하기
// 완료하기랑 삭제하기에서 각각 붙였던 이벤트를 event delegate 기법을 활용하여 개선

document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("new-todo").addEventListener("keydown", addTODO);
	document.getElementById("todo-list").addEventListener("click", function(e){
		if(e.target.className == "toggle"){
			completedTODO(e);
		}
		if(e.target.className == "destroy"){
			removeTODO(e);
		}
	});
});


// --------wiki에 정리해볼것---------
// insertAdjacentHTML vs appendChild
/* 
 * - insertAdjacentHTML => 문자열 형태를 받아서 insert해준다. 
 * - appendChild => 노드가 인자로 들어가야한다.
 * 여기에서 todo는 string형태이기 때문에 insertAdjacentHTML을 사용했다.
 */

// e.currentTarget vs e.target
// setInterval vs requestAnimationFrame