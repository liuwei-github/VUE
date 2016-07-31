var Until = {
	tpl:function(id){
		return document.getElementById(id).innerHTML;
	},
	ajax:function(url,fn){
		var xhr =new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4){
				if(xhr.status === 200 || xhr.status === 304){
					fn && fn(xhr.responseText)
				}
			}
		}
		xhr.open("GET",url,true)
		xhr.send()
	}
}




var Home = Vue.extend({
	template: Until.tpl("tpl_home"),
	data:function(){
		return {
			types:[
				{id: 1, title: '美食', url: 'http://f1.freep.cn/570407/img/icon/01.png'},
				{id: 2, title: '电影', url: 'http://f1.freep.cn/570407/img/icon/02.png'},
				{id: 3, title: '酒店', url: 'http://f1.freep.cn/570407/img/icon/03.png'},
				{id: 4, title: '休闲娱乐', url: 'http://f1.freep.cn/570407/img/icon/04.png'},
				{id: 5, title: '外卖', url: 'http://f1.freep.cn/570407/img/icon/05.png'},
				{id: 6, title: 'KTV', url: 'http://f1.freep.cn/570407/img/icon/06.png'},
				{id: 7, title: '周边游', url: 'http://f1.freep.cn/570407/img/icon/07.png'},
				{id: 8, title: '丽人', url: 'http://f1.freep.cn/570407/img/icon/08.png'},
				{id: 9, title: '小吃快餐', url: 'http://f1.freep.cn/570407/img/icon/09.png'},
				{id: 10, title: '火车票', url: 'http://f1.freep.cn/570407/img/icon/10.png'}
			],
			ad:[],
			list:[]
		}
	},
	created:function(){
		this.$parent.hideSearch = true;
		var that = this;
		Until.ajax("data/home.json",function(res){
			res = JSON.parse(res)
			if(res.errno === 0){
				that.$set("ad",res.data.ad)
				that.$set("list",res.data.list)
			}
		})
	}
})

var List = Vue.extend({
	template:Until.tpl("tpl_list"),
	data:function(){
		return {
			types: [
				{value: '价格排序', key: 'price'},
				{value: '销量排序', key: 'sales'},
				{value: '好评排序', key: 'evaluate'},
				{value: '优惠排序', key: 'discount'}
			],
			list:[],
			other:[]
		}
	},
	events:{
		resertList:function(){
			this.load()
		}
	},
	created:function(){
		this.$parent.hideSearch = true;
		this.load()
	},
	methods:{
		load:function(){
			console.log(222)
			var that = this;
			Until.ajax("data/list.json",function(res){
				res = JSON.parse(res)
				if(res.errno === 0){
					res.data.sort(function(){
						return Math.random() > 0.5 ? 1 : -1
					})
					that.$set("list",res.data.slice(0,3))
					that.$set("other",res.data.slice(3))
				}
			})
		},
		loadMore:function(){
			this.list = this.list.concat(this.other);
			this.other = []
		},
		sortBy:function(key){
			console.log(1)
			this.list.sort(function(a,b){
				if(key === "discount"){
					return (b.orignPrice - b.price) - (a.orignPrice - a.price)
				}
				return b[key] - a[key]
			})
		}
	}
})

var Product = Vue.extend({
	template:Until.tpl("tpl_product"),
	data:function(){
		return {
			product:{
				src:"01.jpg"
			},
			list:[],
			other:[],
			seeMoreStore : true,
			present:false
		}
	},
	created:function(){
		this.$parent.hideSearch = false;
		var that = this;
		Until.ajax("data/product.json",function(res){
			res = JSON.parse(res)
			if(res.errno === 0){
				that.$set("product",res.data)
				that.$set("list",res.data.storeadress.slice(0,1))
				that.$set("other",res.data.storeadress.slice(1))
			}
		})
	},
	methods:{
		seeMore:function(){
			this.list = this.list.concat(this.other);
			this.other = [];
			this.present = true
		},
		seePresent:function(){
			// console.log(111)
			this.other = this.list.slice(1)
			this.list = this.list.slice(0,1)
			this.present = false
		}
	}
})

var Login = Vue.extend({
	template : Until.tpl("tpl_login"),
	data:function(){
		return {			
			showAcc:true,
			showTel:false
		}
	},
	created:function(){
		this.$parent.hideSearch = false;
		// console.log(333)
	},
	methods:{
		toggleClass:function(id){
			// var list = document.querySelector(".login").getElementsByTagName("li")
			// console.log($(".tel-login").addClass('current'))
			if(id===1){
				$(".tel-login").addClass('current')
				$(".account-login").removeClass('current')
				this.showTel = true;
				this.showAcc=false;
			}else{
				$(".tel-login").removeClass('current')
				$(".account-login").addClass('current')				
				this.showAcc = true ;
				this.showTel = false
			}
		}
	}
})

Vue.component("home",Home)
Vue.component("list",List)
Vue.component("product",Product)
Vue.component("login",Login)

Vue.filter("price",function(val){
	return val + "元"
})

Vue.filter("orignPrice",function(val){
	return "门市价" + val + "元"
})

Vue.filter("sales",function(val){
	return "已售" + val
})

Vue.filter("loadMore",function(val){
	return "查看其它" + val + "条团购"
})

var app = new Vue({
	el:"#app",
	data:{
		view:"",
		hideSearch : true,
		query:[],
		showLogin:true,
		navList:false
	},
	methods:{
		backHome:function(){
			// history.go(-1)
			location.hash = "#"
			this.showLogin=true
		},
		searchKey:function(e){
			var value = e.target.value
			if(!value){
				alert("请输入关键词")
				return
			}
			// console.log(value)
			location.hash = "#/list/search/" + value
			e.target.value = ""
		},
		userLogin:function(){
			location.hash="#login";
			this.showLogin = false;
		},
		showList:function(){
			this.navList = !this.navList
		}
	}
	
})

var Router = function(){

	var hash = location.hash.slice(1);
	hash = hash.replace(/^\//,"");
	hash = hash.split("/");
	// console.log(hash)

	if(app.view === hash[0] && hash[0] ==="list"){
		app.query = hash.slice(1)
		app.$broadcast("resertList")
		return
	}

	app.query = hash.slice(1)
	app.view =hash[0] || "home" 
	// console.log(app.query)
	console.log(111)
}

window.addEventListener('hashchange', Router)
window.addEventListener('load', Router)
