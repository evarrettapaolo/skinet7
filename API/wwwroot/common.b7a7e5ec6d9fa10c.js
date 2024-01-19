"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[592],{8795:(Z,v,r)=>{r.d(v,{b:()=>e});var t=r(1571),d=r(5866),l=r(6895),T=r(9838);function p(i,o){1&i&&(t.TgZ(0,"th")(1,"div",4),t._uU(2,"Remove"),t.qZA()())}function u(i,o){if(1&i){const n=t.EpF();t.TgZ(0,"i",19),t.NdJ("click",function(){t.CHM(n);const g=t.oxw().$implicit,x=t.oxw(2);return t.KtG(x.removeBasketItem(g.id,1))}),t.qZA()}}function c(i,o){if(1&i){const n=t.EpF();t.TgZ(0,"i",20),t.NdJ("click",function(){t.CHM(n);const g=t.oxw().$implicit,x=t.oxw(2);return t.KtG(x.addBasketItem(g))}),t.qZA()}}function m(i,o){if(1&i){const n=t.EpF();t.TgZ(0,"td",13)(1,"a",21)(2,"i",22),t.NdJ("click",function(){t.CHM(n);const g=t.oxw().$implicit,x=t.oxw(2);return t.KtG(x.removeBasketItem(g.id,g.quantity))}),t.qZA()()()}}function f(i,o){if(1&i&&(t.TgZ(0,"tr")(1,"th")(2,"div",7),t._UZ(3,"img",8),t.TgZ(4,"div",9)(5,"h5",10)(6,"a",11),t._uU(7),t.qZA()(),t.TgZ(8,"span",12),t._uU(9),t.qZA()()()(),t.TgZ(10,"td",13)(11,"strong"),t._uU(12),t.ALo(13,"currency"),t.qZA()(),t.TgZ(14,"td",13)(15,"div",14),t.YNc(16,u,1,0,"i",15),t.TgZ(17,"strong",16),t._uU(18),t.qZA(),t.YNc(19,c,1,0,"i",17),t.qZA()(),t.TgZ(20,"td",13)(21,"strong"),t._uU(22),t.ALo(23,"currency"),t.qZA()(),t.YNc(24,m,3,0,"td",18),t.qZA()),2&i){const n=o.$implicit,_=t.oxw(2);t.xp6(3),t.s9C("src",n.pictureUrl,t.LSH),t.s9C("alt",n.productName),t.xp6(3),t.MGl("routerLink","/shop/",n.id,""),t.xp6(1),t.hij(" ",n.productName," "),t.xp6(2),t.hij(" Type: ",n.type," "),t.xp6(3),t.Oqu(t.lcZ(13,13,n.price)),t.xp6(3),t.ekj("justify-content-center",!_.isBasket),t.xp6(1),t.Q6J("ngIf",_.isBasket),t.xp6(2),t.Oqu(n.quantity),t.xp6(1),t.Q6J("ngIf",_.isBasket),t.xp6(3),t.Oqu(t.lcZ(23,15,n.price*n.quantity)),t.xp6(2),t.Q6J("ngIf",_.isBasket)}}const a=function(i,o){return{"bg-light":i,"text-secondary":o}};function s(i,o){if(1&i&&(t.TgZ(0,"div",1)(1,"table",2)(2,"thead",3)(3,"tr")(4,"th")(5,"div",4),t._uU(6,"Product"),t.qZA()(),t.TgZ(7,"th")(8,"div",4),t._uU(9,"Price"),t.qZA()(),t.TgZ(10,"th")(11,"div",4),t._uU(12,"Quantity"),t.qZA()(),t.TgZ(13,"th")(14,"div",4),t._uU(15,"Total"),t.qZA()(),t.YNc(16,p,3,0,"th",5),t.qZA()(),t.TgZ(17,"tbody"),t.YNc(18,f,25,17,"tr",6),t.qZA()()()),2&i){const n=o.ngIf,_=t.oxw();t.xp6(2),t.Q6J("ngClass",t.WLB(5,a,_.isBasket,_.isBasket)),t.xp6(8),t.ekj("text-center",!_.isBasket),t.xp6(6),t.Q6J("ngIf",_.isBasket),t.xp6(2),t.Q6J("ngForOf",n.items)}}class e{constructor(o){this.basketService=o,this.addItem=new t.vpe,this.removeItem=new t.vpe,this.isBasket=!0}addBasketItem(o){this.addItem.emit(o)}removeBasketItem(o,n=1){this.removeItem.emit({id:o,quantity:n})}}e.\u0275fac=function(o){return new(o||e)(t.Y36(d.v))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-basket-summary"]],inputs:{isBasket:"isBasket"},outputs:{addItem:"addItem",removeItem:"removeItem"},decls:2,vars:3,consts:[["class","table-responsive",4,"ngIf"],[1,"table-responsive"],[1,"table"],[1,"text-uppercase",3,"ngClass"],[1,"py-2"],[4,"ngIf"],[4,"ngFor","ngForOf"],[1,"p-2","d-inline-block"],[1,"img-fluid",2,"max-height","50px",3,"src","alt"],[1,"ms-3","d-inline-block","align-middle"],[1,"mb-0"],[1,"text-primary","text-decoration-none",3,"routerLink"],[1,"text-muted","fst-italic"],[1,"align-middle"],[1,"d-flex","align-items-center"],["class","fa fa-minus-circle text-warning me-2","style","cursor: pointer; font-size: 2em",3,"click",4,"ngIf"],[2,"font-size","1.2em"],["class","fa fa-plus-circle text-warning mx-2","style","cursor: pointer; font-size: 2em",3,"click",4,"ngIf"],["class","align-middle",4,"ngIf"],[1,"fa","fa-minus-circle","text-warning","me-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"fa","fa-plus-circle","text-warning","mx-2",2,"cursor","pointer","font-size","2em",3,"click"],[1,"text-danger"],[1,"fa","fa-trash",2,"font-size","2em","cursor","pointer",3,"click"]],template:function(o,n){1&o&&(t.YNc(0,s,19,8,"div",0),t.ALo(1,"async")),2&o&&t.Q6J("ngIf",t.lcZ(1,1,n.basketService.basketSource$))},dependencies:[l.mk,l.sg,l.O5,T.rH,l.Ov,l.H9]})},4015:(Z,v,r)=>{r.d(v,{t:()=>f});var t=r(1571),d=r(433),l=r(6895);function T(a,s){1&a&&t._UZ(0,"div",5)}function p(a,s){if(1&a&&(t.TgZ(0,"div",6),t._uU(1),t.qZA()),2&a){const e=t.oxw();t.xp6(1),t.hij("Please enter your ",e.label,"")}}function u(a,s){1&a&&(t.TgZ(0,"div",6),t._uU(1,"Invalid email address"),t.qZA())}function c(a,s){1&a&&(t.TgZ(0,"div",6),t._uU(1,"Password not complex enough"),t.qZA())}function m(a,s){1&a&&(t.TgZ(0,"div",6),t._uU(1,"Email address is taken"),t.qZA())}class f{constructor(s){this.controlDir=s,this.type="text",this.label="",this.controlDir.valueAccessor=this}writeValue(s){}registerOnChange(s){}registerOnTouched(s){}get control(){return this.controlDir.control}}f.\u0275fac=function(s){return new(s||f)(t.Y36(d.a5,2))},f.\u0275cmp=t.Xpm({type:f,selectors:[["app-text-input"]],inputs:{type:"type",label:"label"},decls:9,vars:10,consts:[[1,"form-floating","mb-3"],[1,"form-control",3,"type","formControl","placeholder","ngClass"],["class","fa fa-spinner fa-spin loader",4,"ngIf"],["for","floatingInput"],["class","invalid-feedback",4,"ngIf"],[1,"fa","fa-spinner","fa-spin","loader"],[1,"invalid-feedback"]],template:function(s,e){1&s&&(t.TgZ(0,"div",0),t._UZ(1,"input",1),t.YNc(2,T,1,0,"div",2),t.TgZ(3,"label",3),t._uU(4),t.qZA(),t.YNc(5,p,2,1,"div",4),t.YNc(6,u,2,0,"div",4),t.YNc(7,c,2,0,"div",4),t.YNc(8,m,2,0,"div",4),t.qZA()),2&s&&(t.xp6(1),t.s9C("type",e.type),t.s9C("placeholder",e.label),t.Q6J("formControl",e.control)("ngClass",e.control.touched?e.control.invalid?"is-invalid":"is-valid":null),t.xp6(1),t.Q6J("ngIf","PENDING"===e.control.status),t.xp6(2),t.Oqu(e.label),t.xp6(1),t.Q6J("ngIf",null==e.control.errors?null:e.control.errors.required),t.xp6(1),t.Q6J("ngIf",null==e.control.errors?null:e.control.errors.email),t.xp6(1),t.Q6J("ngIf",null==e.control.errors?null:e.control.errors.pattern),t.xp6(1),t.Q6J("ngIf",null==e.control.errors?null:e.control.errors.emailExists))},dependencies:[l.mk,l.O5,d.Fj,d.JJ,d.oH],styles:[".loader[_ngcontent-%COMP%]{position:absolute;width:auto;top:20px;right:40px;margin-top:0}"]})},5053:(Z,v,r)=>{r.d(v,{S:()=>p});var t=r(1571),d=r(5866),l=r(6895);function T(u,c){if(1&u&&(t.TgZ(0,"ul",4)(1,"li",5)(2,"strong",6),t._uU(3,"Order subtotal"),t.qZA(),t.TgZ(4,"strong"),t._uU(5),t.ALo(6,"currency"),t.qZA()(),t.TgZ(7,"li",5)(8,"strong",6),t._uU(9,"Shipping and handling"),t.qZA(),t.TgZ(10,"strong"),t._uU(11),t.ALo(12,"currency"),t.qZA()(),t.TgZ(13,"li",5)(14,"strong",6),t._uU(15,"Total"),t.qZA(),t.TgZ(16,"strong"),t._uU(17),t.ALo(18,"currency"),t.qZA()()()),2&u){const m=c.ngIf;t.xp6(5),t.Oqu(t.lcZ(6,3,m.subtotal)),t.xp6(6),t.Oqu(t.lcZ(12,5,m.shipping)),t.xp6(6),t.Oqu(t.lcZ(18,7,m.total))}}class p{constructor(c){this.basketService=c}}p.\u0275fac=function(c){return new(c||p)(t.Y36(d.v))},p.\u0275cmp=t.Xpm({type:p,selectors:[["app-order-totals"]],decls:7,vars:3,consts:[[1,"bg-light","px-4","py-3","text-uppercase","fw-bold","text-secondary"],[1,"p-4"],[1,"fst-italic","mb-4"],["class","list-unstyled mb-4",4,"ngIf"],[1,"list-unstyled","mb-4"],[1,"d-flex","justify-content-between","py-3","border-bottom"],[1,"text-muted"]],template:function(c,m){1&c&&(t.TgZ(0,"div",0),t._uU(1," Order summary\n"),t.qZA(),t.TgZ(2,"div",1)(3,"p",2),t._uU(4,"Shipping costs will be calculated based on choices made during checkout"),t.qZA(),t.YNc(5,T,19,9,"ul",3),t.ALo(6,"async"),t.qZA()),2&c&&(t.xp6(5),t.Q6J("ngIf",t.lcZ(6,1,m.basketService.basketTotalSource$)))},dependencies:[l.O5,l.Ov,l.H9]})}}]);