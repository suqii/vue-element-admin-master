(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a512aaa"],{1096:function(t,n,a){"use strict";a("f002")},"2b90":function(t,n,a){"use strict";a("3b59")},"3b59":function(t,n,a){},b23f:function(t,n,a){"use strict";a.r(n);var s=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"components-container board"},[a("Kanban",{key:1,staticClass:"kanban todo",attrs:{list:t.list1,group:t.group,"header-text":"Todo"}}),a("Kanban",{key:2,staticClass:"kanban working",attrs:{list:t.list2,group:t.group,"header-text":"Working"}}),a("Kanban",{key:3,staticClass:"kanban done",attrs:{list:t.list3,group:t.group,"header-text":"Done"}})],1)},e=[],i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",{staticClass:"board-column"},[a("div",{staticClass:"board-column-header"},[t._v(" "+t._s(t.headerText)+" ")]),a("draggable",t._b({staticClass:"board-column-content",attrs:{list:t.list,"set-data":t.setData}},"draggable",t.$attrs,!1),t._l(t.list,(function(n){return a("div",{key:n.id,staticClass:"board-item"},[t._v(" "+t._s(n.name)+" "+t._s(n.id)+" ")])})),0)],1)},o=[],r=a("8ecb"),l=a.n(r),c={name:"DragKanbanDemo",components:{draggable:l.a},props:{headerText:{type:String,default:"Header"},options:{type:Object,default:function(){return{}}},list:{type:Array,default:function(){return[]}}},methods:{setData:function(t){t.setData("Text","")}}},d=c,u=(a("1096"),a("cba8")),b=Object(u["a"])(d,i,o,!1,null,"083991bb",null),m=b.exports,p={name:"DragKanbanDemo",components:{Kanban:m},data:function(){return{group:"mission",list1:[{name:"Mission",id:1},{name:"Mission",id:2},{name:"Mission",id:3},{name:"Mission",id:4}],list2:[{name:"Mission",id:5},{name:"Mission",id:6},{name:"Mission",id:7}],list3:[{name:"Mission",id:8},{name:"Mission",id:9},{name:"Mission",id:10}]}}},f=p,g=(a("2b90"),Object(u["a"])(f,s,e,!1,null,null,null));n["default"]=g.exports},f002:function(t,n,a){}}]);