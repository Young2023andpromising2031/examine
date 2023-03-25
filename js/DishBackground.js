// 搜索框实现
var submit = document.getElementById('submit');
// 注册事件   onfocus
submit.onfocus = function () {
    this.value = ""
    console.log('点击出现光标，可输入文字');
    // 显示ul
    // ul.style.display = 'block'
    // this.classList.add('search');
};
submit.onblur = function () {
    console.log('点击其他地方，光标消失，不可输入文字');
    if (this.value.trim() == "") {
        this.value = "搜索框"
    }
    //     // ul.style.display = 'none'
    //     // this.classList.remove('search')
}
// 菜单页面
// 分页查询
var foodPage = 1
var foodPageSize = 5
var WebDishContent = document.getElementById("WebDishContent");
function getfoodPage(num, nums) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/getInfoByPage",
        data: {
            page: num,
            per_page: nums
        },
        success: function (result) {
            console.log(result, 'result')
            // 清除WebDish中的li内容
            WebDishContent.innerHTML = ""
            for (var i = 0; i < result.data.length; i++) {
                WebDishContent.innerHTML += "<ul class='ulSty'>"
                    + "<li>" + result.data[i].name + "</li>" +
                    "<li>" + result.data[i].price + "</li>" +
                    "<li>" + result.data[i].desc + "</li>" +
                    "<li>" + result.data[i].typename + "</li>" +
                    "<li>" +
                    "<button class='foodChange' onclick='foodChangeE(" + JSON.stringify(result.data[i]) + ")'>修改</button>" +
                    "<button class='foodDel'>删除</button>" +
                    "</li>" +
                    "<li style='display:none'>" + JSON.stringify(result.data[i]) + "</li>"
                "</ul>"
            }
            // 删除
            var foodDel = document.getElementsByClassName('foodDel');
            for (var i = 0; i < foodDel.length; i++) {
                foodDel[i].onclick = function () {
                    console.log('删除功能', foodDel);
                    // 找到id所在位置
                    var obj = JSON.parse(this.parentElement.parentElement.lastElementChild.innerHTML)
                    // 获取id
                    var id = obj._id
                    console.log(id);
                    // 确定是否删除
                    if (confirm('确定要删除吗')) {
                        delFood(id);
                    }
                }
            }
            // 修改
            // var foodChange = document.getElementsByClassName('foodChange');
            // console.log(foodChange);
            // var modifyPop = document.getElementsByClassName('modifyPop');
            // for (var i = 0; i < foodChange.length; i++) {
            //     foodChange[i].onclick = function () {

            //     }
            //     }

            //     // 如何获取input中的每行数据？
        },
        error: function (err) {
            console.log("输入错误！")
        }
    })
}
// 修改功能
var foodChange = document.getElementsByClassName('foodChange');
console.log(foodChange);
var modifyPop = document.getElementsByClassName('modifyPop');
console.log(modifyPop);
var a = document.getElementById('inputvalue').value;
console.log(a);
function foodChangeE(e) {
    console.log(e, '1111');
    console.log("修改功能");
    modifyPop[0].style.display = "flex";
    a.value = e.name,
    a.value = e.price,
    a.value = e.desc,
    a.value = e.typeid
    // JSON.stringify(e.data[1])  加双引号
}
getfoodPage(foodPage, foodPageSize);
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
// 查询菜品总数
var len = document.getElementById('len');
function getFoodsum() {
    $.ajax({
        type: "GET",
        url: "http://118.195.129.130:3000/food/allpage",
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
getFoodsum()
// 删除功能
var del = document.getElementsByClassName('del')[0];
function delFood(id) {
    $.ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/del",
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
//增加功能
var addFood = document.getElementsByClassName('addFood');
function addFood(aName, aPrice, aDesc, aTypename, aTypeid) {
    $ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/add",
        data: {
            _name: aName,
            _price: aPrice,
            _desc: aDesc,
            _typename: aTypename,
            _typeid: aTypeid
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
function modifyFood(mName, mPrice, mDesc, mtypename, mtypeid) {
    $ajax({
        type: "POST",
        url: "http://118.195.129.130:3000/food/update",
        data: {
            _name: mName,
            _price: mPrice,
            _desc: mDesc,
            _typename: mtypename,
            _typeid: mtypeid,
            // _id: id,
        },
        success: function (result) {
            console.log(result, 'result')
            getfoodPage(1, 3);
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
        foodPage--
        pagenum.innerHTML--;
        getfoodPage(foodPage, foodPageSize);
    }
}
// 下一页按纽实现
nextbtn.onclick = function () {
    console.log('下一页');
    // Math.ceil():四舍五入并返回大于等于给定数字的最小整数
    if (foodPage >= Math.ceil(len / 5)) {
        alert("当前是最后一页！");
    } else {
        pagenum.innerHTML++;
        foodPage++;
        getfoodPage(foodPage, foodPageSize);
    }
}

// 侧边栏实现
var user = document.getElementById('user');
console.log(user)
var rightCondentUser = document.querySelector('.rightCondentUser');
console.log(rightCondentUser)
var rightCondentDish = document.querySelector('.rightCondentDish');
var rightCondentOrder = document.querySelector('.rightCondentOrder');
user.onclick = function(){
    rightCondentUser.style.display="block";
    rightCondentDish.style.display="none";
    rightCondentOrder.style.display="none";
}
var dish = document.getElementById('dish');
console.log(dish)
dish.onclick = function(){
    rightCondentUser.style.display="none";
    rightCondentDish.style.display="block";
    rightCondentOrder.style.display="none";
}
var order = document.getElementById('order');
console.log(order)
order.onclick = function(){
    rightCondentUser.style.display="none";
    rightCondentDish.style.display="none";
    rightCondentOrder.style.display="block";
}


