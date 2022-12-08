(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9cb9fb84"],{"33f5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"columns fixed-page"},[a("div",{staticClass:"column main-column"},[a("div",{staticClass:"flexrow project-dates"},[a("div",{staticClass:"flexrow-item"},[a("label",{staticClass:"label"},[e._v(" "+e._s(e.$t("main.start_date"))+" ")]),a("datepicker",{attrs:{"wrapper-class":"datepicker","input-class":"date-input input",language:e.locale,"disabled-dates":{days:[6,0]},"monday-first":!0,format:"yyyy-MM-dd",disabled:""},model:{value:e.selectedStartDate,callback:function(t){e.selectedStartDate=t},expression:"selectedStartDate"}})],1),a("div",{staticClass:"flexrow-item field"},[a("label",{staticClass:"label"},[e._v(" "+e._s(e.$t("main.end_date"))+" ")]),a("datepicker",{attrs:{"wrapper-class":"datepicker","input-class":"date-input input",language:e.locale,"disabled-dates":{days:[6,0]},"monday-first":!0,format:"yyyy-MM-dd",disabled:""},model:{value:e.selectedEndDate,callback:function(t){e.selectedEndDate=t},expression:"selectedEndDate"}})],1),a("combobox-number",{staticClass:"flexrow-item zoom-level",attrs:{label:e.$t("schedule.zoom_level"),options:e.zoomOptions},model:{value:e.zoomLevel,callback:function(t){e.zoomLevel=t},expression:"zoomLevel"}})],1),a("schedule",{attrs:{"end-date":e.endDate,hierarchy:e.scheduleItems,"is-loading":e.loading.schedule,"is-error":e.errors.schedule,"start-date":e.startDate,"zoom-level":e.zoomLevel,"hide-man-days":!0},on:{"item-changed":e.onScheduleItemChanged,"change-zoom":e.changeZoom,"root-element-expanded":e.expandProductionElement}})],1)])},o=[],r=a("2f62"),l=a("7f45"),s=a.n(l),c=a("2430"),i=a("fa33"),d=a("9d8b"),u=a("3657"),m=a("7930"),p=a("1e4c"),f=a("d7c7");function b(e){return b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},b(e)}function h(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function v(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?h(Object(a),!0).forEach((function(t){y(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function y(e,t,a){return t=D(t),t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function D(e){var t=g(e,"string");return"symbol"===b(t)?t:String(t)}function g(e,t){if("object"!==b(e)||null===e)return e;var a=e[Symbol.toPrimitive];if(void 0!==a){var n=a.call(e,t||"default");if("object"!==b(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}var O={name:"production-schedule",components:{ComboboxNumber:p["a"],Datepicker:i["a"],Schedule:f["a"]},data:function(){return{endDate:s()().add(6,"months"),scheduleItems:[],startDate:s()(),selectedStartDate:null,selectedEndDate:null,zoomLevel:0,zoomOptions:[{label:"Week",value:0},{label:"1",value:1},{label:"2",value:2},{label:"3",value:3}],loading:{schedule:!1},errors:{schedule:!1}}},mounted:function(){this.reset()},computed:v(v({},Object(r["c"])(["openProductions","taskTypeMap","user"])),{},{locale:function(){return"fr_FR"===this.user.locale?c["fr"]:c["en"]}}),methods:v(v({},Object(r["b"])(["editProduction","loadScheduleItems","saveScheduleItem"])),{},{changeZoom:function(e){e.wheelDelta<0&&this.zoomLevel>1&&this.zoomLevel--,e.wheelDelta>0&&this.zoomLevel<3&&this.zoomLevel++},reset:function(){this.scheduleItems=this.convertScheduleItems(this.openProductions),this.startDate=Object(u["l"])(this.scheduleItems),this.endDate=Object(u["m"])(this.scheduleItems),this.selectedStartDate=this.startDate.toDate(),this.selectedEndDate=this.endDate.toDate()},convertScheduleItems:function(e){return e.map((function(e){var t=Object(u["o"])(e.start_date),a=Object(u["k"])(t,e.end_date);return v(v({},e),{},{avatar:"Project"===e.type,color:e.color||m["a"].fromString(e.name,!0),startDate:t,endDate:a,expanded:!1,loading:!1,editable:!0,route:Object(d["g"])(e.id),children:[]})}))},convertTaskTypeScheduleItems:function(e){var t=this;return e.map((function(e){var a=Object(u["o"])(e.start_date),n=Object(u["k"])(a,e.end_date),o=t.taskTypeMap.get(e.task_type_id);return v(v({},e),{},{name:o.name,color:o.color,startDate:a,endDate:n,expanded:!1,loading:!1,editable:!0,children:[]})}))},expandProductionElement:function(e){var t=this;e.expanded?e.expanded=!1:(e.loading=!0,e.expanded=!0,this.loadScheduleItems(e).then((function(a){a=t.convertTaskTypeScheduleItems(a),e.children=a,e.loading=!1})))},onScheduleItemChanged:function(e){"Project"!==e.type?this.saveScheduleItem(e):this.editProduction({id:e.id,start_date:e.startDate.format("YYYY-MM-DD"),end_date:e.endDate.format("YYYY-MM-DD")})}}),socket:{},watch:{},metaInfo:function(){return{title:"".concat(this.$t("schedule.title_main")," - Kitsu")}}},j=O,S=(a("d6fb"),a("2877")),w=Object(S["a"])(j,n,o,!1,null,"5082f03a",null);t["default"]=w.exports},b004:function(e,t,a){},d6fb:function(e,t,a){"use strict";a("b004")}}]);
//# sourceMappingURL=chunk-9cb9fb84.d92edc6c.js.map