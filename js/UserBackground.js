// 用户页面
// 分页查询
var userPage = 1
var userPageSize = 5
var WebDishContent = document.getElementById("WebDishContent");
function getUserPage(usernum, usernums) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/getInfoByPage_users",
        data: {
            page: usernum,
            per_page: usernums
        },
        success: function (result) {
            console.log(result, 'result')
            // 清除WebDish中的li内容
            WebDishContent.innerHTML = ""
            for (var i = 0; i < result.data.length; i++) {
                WebDishContent.innerHTML += "<ul class='ulSty'>"
                    + "<li>" + result.data[i].us + "</li>" +
                    "<li>" + result.data[i].id+ "</li>" +
                    "<li>" + result.data[i].age + "</li>" +
                    "<li>" + result.data[i].sex + "</li>" +
                    "<li>" +
                    "<button class='userChange' onclick='userChangeE(" + JSON.stringify(result.data[i]) + ")'>修改</button>" +
                    "<button class='userDel'>删除</button>" +
                    "</li>" +
                    "<li style='display:none'>" + JSON.stringify(result.data[i]) + "</li>"
                "</ul>"
            }
            // 删除
            var userDel = document.getElementsByClassName('userDel');
            for (var i = 0; i < userDel.length; i++) {
                userDel[i].onclick = function () {
                    console.log('删除功能', userDel);
                    // 找到id所在位置
                    var obj = JSON.parse(this.parentElement.parentElement.lastElementChild.innerHTML)
                    // 获取id
                    var id = obj._id
                    console.log(id);
                    // 确定是否删除
                    if (confirm('确定要删除吗')) {
                        delUser(id);
                    }
                }
            }
        },
        error: function (err) {
            console.log("输入错误！")
        }
    })
}
// 修改功能
var userChange = document.getElementsByClassName('userChange');
console.log(foodChange);
var modifyPop = document.getElementsByClassName('modifyPop');
console.log(modifyPop);
var a = document.getElementById('inputvalue').value;
console.log(a);
function userChangeE(e) {
    console.log(e, '1111');
    console.log("修改功能");
    modifyPop[0].style.display = "flex";
    a.value = e.us,
    a.value = e.id,
    a.value = e.age,
    a.value = e.sex
    // JSON.stringify(e.data[1])  加双引号
}
getfoodPage(userPage, userPageSize);
// 增加
var addBtn = document.getElementsByClassName('addBtn');
var certain = document.getElementsByClassName('certain')[0];
console.log(certain)
for (var i = 0; i < addBtn.length; i++) {
    addBtn[i].onclick = function () {
        console.log("增加功能");
        modifyPop[0].style.display = "flex";
        // 如果点击确定按钮，添加成功；点击取消，恢复页面
        // certain.onclick() = function(){
        //     a.value = e.name,
        //     a.value = e.price,
        //     a.value = e.desc,
        //     a.value = e.typeid
        // }
    }
}
// 查询用户总数
var len = document.getElementById('len');
function getUsersum() {
    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/users/allpage_users",
        success: function (result) {
            console.log(result, 'result')
            // getFoodsum(len);
            len = result.pages
        },
        error: function (err) {
            console.log("查询失败")
        }
    })
}
getUsersum()
// 删除功能
var del = document.getElementsByClassName('del')[0];
function delUser(id) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/del_users",
        data: {
            _id: id,
        },
        success: function (result) {
            console.log(result, 'result')
            getfoodPage(2, 5);
        },
        error: function (err) {
            console.log("输入错误！")
        }
    })
}
//添加积分
var addUser = document.getElementsByClassName('addUser');
function addUser(aUs, aAge, aSex, aIntegral) {
    $ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/integral",
        data: {
            _us: aUs,
            _age: aAge,
            _sex: aSex,
            _integral: aIntegral,
        },
        success: function (result) {
            console.log(result, 'result');
            getfoodPage(1, 3);
        },
        error: function (err) {
            console.log("增加失败！")
        }
    })
}
// 修改功能
var modify = document.getElementsByClassName('modify');
function modifyFood(aUs, aAge, aSex,id) {
    $ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/users/update_users",
        data: {
            _us: aUs,
            _age: aAge,
            _sex: aSex,
            _id: id,
        },
        success: function (result) {
            console.log(result, 'result')
            getUserPage(1, 3);
        },
        error: function (err) {
            console.log("修改失败！")
        }
    })
}
// 确定按钮
var certain = document.getElementsByClassName('certain')[0];
certain.onclick = function () {
    console.log("确定");
    modifyPop[0].style.display = "none";
}
// 取消按钮
var cancel = document.getElementsByClassName('cancel')[0];
cancel.onclick = function () {
    console.log("取消");
    modifyPop[0].style.display = "none";
}
//弹框的关闭按钮
var stopIt = document.getElementById('stopIt');
stopIt.onclick = function () {
    modifyPop[0].style.display = "none";
}
// 翻页部分
var prevbtn = document.getElementById('prevBtn');
var nextbtn = document.getElementById('nextBtn');
var pagenum = document.getElementById('nowpage');
// 上一页按钮实现
prevbtn.onclick = function () {
    console.log('上一页');
    if (pagenum.innerHTML <= 1) {
        alert("当前页数已至顶！")
    } else {
        userPage--
        pagenum.innerHTML--;
        getUserPage(userPage, userPageSize);
    }
}
// 下一页按纽实现
nextbtn.onclick = function () {
    console.log('下一页');
    // Math.ceil():四舍五入并返回大于等于给定数字的最小整数
    if (userPage >= Math.ceil(len / 5)) {
        alert("当前是最后一页！");
    } else {
        pagenum.innerHTML++;
        userPage++;
        getUserPage(userPage, userPageSize);
    }
}