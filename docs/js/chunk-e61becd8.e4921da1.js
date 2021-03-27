(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e61becd8"],{"4e76":function(t,e,n){},b83a:function(t,e,n){"use strict";n("4e76")},e19f:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[t.title?n("h2",{staticClass:"title"},[t._v(" "+t._s(t.title)+" ")]):t._e(),n("div",{staticClass:"description"},[t._t("description")],2),n("div",{staticClass:"sides"},[n("div",{staticClass:"side",staticStyle:{overflow:"hidden"}},[t._t("map")],2),n("div",{staticClass:"side"},[n("div",{staticClass:"code"},[n("h4",[t._v("Code:")]),t._t("code")],2)])]),t._t("default")],2)},s=[],r={name:"Wrapper",props:{title:{type:String,default:null}}},i=r,o=(n("b83a"),n("2877")),p=Object(o["a"])(i,a,s,!1,null,"62ebedd4",null);e["a"]=p.exports},e603:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("example-wrapper",{attrs:{title:"Heatmap"},scopedSlots:t._u([{key:"description",fn:function(){return[n("p",[t._v(" We can create heatmaps that depend on concentrations of points."),n("br"),t._v("Each point requires a lat and lng property. ")])]},proxy:!0},{key:"map",fn:function(){return[n("gmaps-map",{attrs:{options:t.mapOptions}},[n("gmaps-heatmap",{attrs:{items:t.items}})],1)]},proxy:!0},{key:"code",fn:function(){return[n("div",[n("pre",[t._v('<gmaps-map>\n  <gmaps-heatmap :items="items" />\n</gmaps-map>\n\n...\n\nitems = [\n  { lat: -32, lng: 125 },\n  { lat: -34, lng: 128 },\n  ...,\n  { lat: -28, lng: 126 },\n  { lat: -30, lng: 130 },\n]\n        ')])])]},proxy:!0}])})},s=[],r=n("e19f"),i=n("4d85"),o=n("f99b"),p={name:"ExampleHeatmap",components:{ExampleWrapper:r["a"],gmapsMap:i["h"],gmapsHeatmap:i["f"]},data:function(){return{mapOptions:o["a"],items:[]}},created:function(){for(var t=0;t<200;t++)this.items.push({lat:15*Math.random()-32,lng:120+25*Math.random()})}},l=p,c=n("2877"),m=Object(c["a"])(l,a,s,!1,null,null,null);e["default"]=m.exports},f99b:function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var a={center:{lat:-27,lng:133},zoom:4,fullscreenControl:!1,mapTypeControl:!1,rotateControl:!1,scaleControl:!1,streetViewControl:!1,zoomControl:!1}}}]);
//# sourceMappingURL=chunk-e61becd8.e4921da1.js.map