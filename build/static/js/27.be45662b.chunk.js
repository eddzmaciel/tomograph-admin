(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{971:function(e,t,a){"use strict";a.r(t);var n=a(14),r=a.n(n),s=a(31),l=a(103),c=a(104),i=a(106),o=a(105),m=a(107),u=a(1),d=a.n(u),f=a(331),p=a(4),h=a(357),E=a.n(h),b=a(397),x=a.n(b),N=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(o.a)(t).call(this,e))).state={data:[],total:""},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){var e=Object(s.a)(r.a.mark(function e(){var t;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this,e.next=3,p.a.service("transferable-fixed").find({});case 3:t=e.sent,console.log("transferableFixed 1",t),this.setState({data:t.data});case 6:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=[{dataField:"year",text:"A\xf1o",sort:!0,formatter:function(e,t){return e}},{dataField:"transmission",text:"Transmisi\xf3n",sort:!0,formatter:function(e,t){return e}},{dataField:"distribution",text:"Distribuci\xf3n",sort:!0,formatter:function(e,t){return e}},{dataField:"scxnnomem",text:"SCXN No MEM",sort:!0,formatter:function(e,t){return e}},{dataField:"cenace",text:"CENACE",sort:!0,formatter:function(e,t){return e}},{dataField:"actions",text:"Acciones",headerStyle:function(e,t){return{width:150}},formatter:function(t,a){return d.a.createElement(f.I,null,d.a.createElement(f.n,{col:"6",sm:"4",md:"2",xl:!0,className:"mb-3 mb-xl-0"},d.a.createElement(f.e,{color:"danger",className:"btn-square pull-right",style:{marginLeft:5}},d.a.createElement("i",{className:"fa fa-trash"})),d.a.createElement(f.e,{color:"success",className:"btn-square pull-right",onClick:function(){return e.props.history.push("/trasladables-fijos/"+a._id)}},d.a.createElement("i",{className:"fa fa-pencil"})," Editar")))}}];return d.a.createElement("div",{className:"animated fadeIn"},d.a.createElement(f.I,null,d.a.createElement(f.n,{xs:"12",lg:"12"},d.a.createElement(f.h,null,d.a.createElement(f.l,null,"Administraci\xf3n - Trasladables fijos",d.a.createElement("div",{className:"card-header-actions"},d.a.createElement("i",{className:"fa fa-download"}),d.a.createElement("a",{href:"http://ipco.com",className:"card-header-action"},d.a.createElement("small",{className:"text-muted"},"EXPORTAR")))),d.a.createElement(f.I,{className:"pull-right",style:{marginTop:"5px",paddingRight:"5px"}},d.a.createElement(f.n,{col:"12",sm:"12",md:"12"},d.a.createElement(f.e,{onClick:function(){return e.props.history.push("/trasladables-fijos/form")},color:"success",className:"btn-square pull-right"},d.a.createElement("i",{className:"fa fa-plus"})," ","Agregar Trasladables Fijos"))),d.a.createElement(f.I,null,d.a.createElement(f.i,{style:{paddingTop:8}},d.a.createElement(E.a,{keyField:"_id",data:this.state.data,columns:t,pagination:x()(),bootstrap4:!0,condensed:!0,striped:!0,hover:!0})))))))}}]),t}(u.Component);t.default=N}}]);
//# sourceMappingURL=27.be45662b.chunk.js.map