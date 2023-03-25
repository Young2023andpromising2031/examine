// 用户登录
var registerBtn = document.getElementById('registerBtn')
var put = document.getElementById('put')
var pas = document.getElementById('pas')

registerBtn.onclick = function () {
	console.log(236);
	$.ajax({
		type: "POST",
		url: 'http://118.195.129.130:3000/user/login',
		data: {
			us: put.value,
			ps: pas.value
		},
		success: function (result) {
			console.log(result, 'result');
			if (result.err == 0) {
				window.location.href = "../html/WebBackground.html"
			}
		},
		wrong: function (wro) {
			console.log("您输入的密码有误！");
		}
	})
}



