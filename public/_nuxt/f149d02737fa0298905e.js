(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{369:function(e,t,n){},372:function(e,t,n){"use strict";var d=n(369);n.n(d).a},373:function(e,t,n){"use strict";var d={name:"event-card-photo",props:["event"]},r=n(35),l={name:"events-list",components:{EventCardPhoto:Object(r.a)(d,function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.event?n("div",{staticClass:"card-image"},[n("NuxtLink",{staticClass:"is-visible-mobile",attrs:{to:"/event/"+e.event.slug,"aria-label":e.event.name}},[n("figure",{staticClass:"image"},[n("clazy-load",{staticClass:"clazy-load-wrapper",attrs:{src:e.event.thumb_mobile,ratio:.1}},[n("transition",{attrs:{name:"fade"}},[n("img",{staticClass:"event-image",attrs:{alt:e.event.name,src:e.event.thumb_mobile}})])],1)],1)]),e._v(" "),n("NuxtLink",{staticClass:"is-visible-tablet",attrs:{to:"/event/"+e.event.slug,"aria-label":e.event.name}},[n("figure",{staticClass:"image"},[n("clazy-load",{staticClass:"clazy-load-wrapper",attrs:{src:e.event.thumb_tablet,ratio:.1}},[n("transition",{attrs:{name:"fade"}},[n("img",{staticClass:"event-image",attrs:{alt:e.event.name,src:e.event.thumb_tablet}})])],1)],1)]),e._v(" "),n("NuxtLink",{staticClass:"is-visible-computer",attrs:{to:"/event/"+e.event.slug,"aria-label":e.event.name}},[n("figure",{staticClass:"image"},[n("clazy-load",{staticClass:"clazy-load-wrapper",attrs:{src:e.event.thumb_desktop,ratio:.1}},[n("transition",{attrs:{name:"fade"}},[n("img",{staticClass:"event-image",attrs:{alt:e.event.name,src:e.event.thumb_desktop}})])],1)],1)])],1):e._e()},[],!1,null,null,null).exports},props:{events:{type:Array}}},o=(n(372),Object(r.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.events.length?n("div",{staticClass:"row columns is-multiline"},e._l(e.events,function(t){return n("div",{key:"event-"+t.slug,staticClass:"column has-cursor-pointer is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd"},[n("div",{staticClass:"card large"},[n("EventCardPhoto",{attrs:{event:t}}),e._v(" "),n("div",{staticClass:"card-content"},[n("div",{staticClass:"media"},[t.location.thumb_small?n("div",{staticClass:"media-left"},[n("nuxt-link",{attrs:{to:"/location/"+t.location.slug,"aria-label":t.location.name}},[n("figure",{staticClass:"image is-128x128"},[n("clazy-load",{staticClass:"clazy-load-wrapper",attrs:{src:t.location.thumb_small,ratio:.1}},[n("transition",{attrs:{name:"fade"}},[n("img",{attrs:{alt:t.location.name,src:t.location.thumb_small}})])],1)],1)]),e._v(" "),n("span",{staticClass:"tag is-success is-medium is-w-128"},[n("nuxt-link",{staticClass:"has-text-white has-no-underline",attrs:{to:"/category/"+t.category.slug,"aria-label":t.category.name}},[e._v("\n                "+e._s(t.category.name)+"\n              ")])],1)],1):e._e(),e._v(" "),n("div",{staticClass:"media-content"},[n("h4",{staticClass:"title is-3 is-size-3-desktop is-size-2-tablet is-size-4-mobile is-capitalized"},[n("nuxt-link",{staticClass:"has-text-black has-no-underline",attrs:{to:"/event/"+t.slug,"aria-label":t.name}},[e._v("\n                "+e._s(t.name)+"\n              ")])],1),e._v(" "),n("h5",{staticClass:"subtitle is-5 is-size-5-desktop is-size-3-tablet is-size-5-mobile is-capitalized"},[n("nuxt-link",{staticClass:"has-no-underline",attrs:{to:"/location/"+t.location.slug,"aria-label":t.location.name}},[e._v("\n                "+e._s(t.location.name)+"\n              ")])],1)])]),e._v(" "),n("div",{staticClass:"content"},[t.end_date?n("h4",{staticClass:"title is-5 is-size-5-mobile has-text-normal has-text-grey-dark has-text-centered"},[e._v("\n            "+e._s(e._f("fullDate")(t.start_date))+" - "+e._s(e._f("fullDate")(t.end_date))+"\n          ")]):n("h4",{staticClass:"title is-5 is-size-5-mobile has-text-normal has-text-grey-dark has-text-centered"},[e._v("\n            "+e._s(e._f("fullDate")(t.start_date))+"\n          ")]),e._v(" "),t.end_time?n("h4",{staticClass:"subtitle is-5 is-size-5-mobile has-text-normal has-text-grey-light has-text-centered"},[e._v("\n            "+e._s(t.start_time)+" - "+e._s(t.end_time)+"\n          ")]):n("h4",{staticClass:"subtitle is-5 is-size-5-mobile has-text-normal has-text-grey-light has-text-centered"},[e._v("\n            "+e._s(t.start_time)+"\n          ")]),e._v(" "),n("b-button",{staticClass:"is-centered",attrs:{type:"is-light",size:"is-large"}},[e._v("\n            "+e._s(t.price)+"\n          ")]),e._v(" "),t.is_family_friendly?n("div",{staticClass:"is-visible-touch"},[n("b-button",{staticClass:"mt-1 is-centered",attrs:{type:"is-warning","icon-left":"child","icon-pack":"fas",size:"is-medium"}},[e._v("\n              Family Friendly\n            ")])],1):e._e(),e._v(" "),t.short_description?n("p",{staticClass:"has-text-grey-dark mt-2"},[e._v("\n            "+e._s(e._f("truncate")(t.short_description,200))+"\n          ")]):e._e(),e._v(" "),t.tags.length?n("div",{staticClass:"is-visible-touch tags mb-0 mt-1"},e._l(t.tags,function(t){return n("nuxt-link",{key:t.slug,staticClass:"tag block is-info is-small has-text-white has-no-underline",attrs:{to:"/tag/"+t.slug,"aria-label":t.name}},[e._v("\n              "+e._s(t.name)+"\n            ")])}),1):e._e(),e._v(" "),t.tags.length?n("div",{staticClass:"is-visible-computer tags absolute bottom-5 left-10 mb-0 mt-1"},e._l(t.tags,function(t){return n("nuxt-link",{key:t.slug,staticClass:"tag block is-info is-small has-text-white has-no-underline",attrs:{to:"/tag/"+t.slug,"aria-label":t.name}},[e._v("\n              "+e._s(t.name)+"\n            ")])}),1):e._e(),e._v(" "),t.is_family_friendly?n("div",{staticClass:"absolute bottom-10 right-10 is-visible-computer"},[n("b-button",{attrs:{type:"is-warning","icon-left":"child","icon-pack":"fas",size:"is-small"}},[e._v("\n              Family Friendly\n            ")])],1):e._e()],1)])],1)])}),0):e._e()},[],!1,null,"adcf5736",null));t.a=o.exports},374:function(e,t,n){"use strict";var d=n(0),r=n.n(d),l={name:"filter-by-date",data:function(){return{start_date:r()().startOf("day").toDate(),end_date:r()().add(10,"day").toDate(),minDate:r()().startOf("day").toDate(),maxDate:r()().add(2,"month").toDate()}},methods:{formatDate:function(e){return r()(e).format("YYYY-MM-DD")},changeDate:function(e){this.$emit("change",e,this[e])}}},o=n(35),component=Object(o.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"hero is-small is-success is-bold"},[n("div",{staticClass:"hero-body"},[n("div",{staticClass:"container"},[n("h2",{staticClass:"subtitle is-5 has-text-centered"},[e._v("\n        Choose Time Period\n      ")]),e._v(" "),n("div",{staticClass:"columns is-centered"},[n("div",{staticClass:"column is-3"},[n("b-field",{attrs:{label:"Start Date","custom-class":"has-text-white has-text-centered"}},[n("b-datepicker",{attrs:{icon:"calendar-alt","icon-pack":"fas",size:"is-medium","min-date":e.minDate,"max-date":e.maxDate,"first-day-of-week":1,"date-formatter":e.formatDate,"mobile-native":!0,"aria-label":"Start date"},on:{input:function(t){return e.changeDate("start_date")}},model:{value:e.start_date,callback:function(t){e.start_date=t},expression:"start_date"}})],1)],1),e._v(" "),n("div",{staticClass:"column is-3"},[n("b-field",{attrs:{label:"End Date","custom-class":"has-text-white has-text-centered"}},[n("b-datepicker",{attrs:{icon:"calendar-alt","icon-pack":"fas",size:"is-medium","min-date":e.minDate,"max-date":e.maxDate,"first-day-of-week":1,"date-formatter":e.formatDate,"mobile-native":!0,"aria-label":"End date"},on:{input:function(t){return e.changeDate("end_date")}},model:{value:e.end_date,callback:function(t){e.end_date=t},expression:"end_date"}})],1)],1)])])])])},[],!1,null,null,null);t.a=component.exports},380:function(e,t){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"eventsByCategory"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"slug"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"start_date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]},{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"end_date"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"String"}}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"eventsByCategory"},arguments:[{kind:"Argument",name:{kind:"Name",value:"slug"},value:{kind:"Variable",name:{kind:"Name",value:"slug"}}},{kind:"Argument",name:{kind:"Name",value:"start_date"},value:{kind:"Variable",name:{kind:"Name",value:"start_date"}}},{kind:"Argument",name:{kind:"Name",value:"end_date"},value:{kind:"Variable",name:{kind:"Name",value:"end_date"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"category"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_default"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"photo"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"updated_at"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"events"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"label"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"days"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"events"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"location_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"user_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"category_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"event_type_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"start_date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"end_date"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"price"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"start_time"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"end_time"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"short_description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"featured"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_sold_out"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"website"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"is_family_friendly"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"photo"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"thumb_mobile"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"thumb_tablet"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"thumb_desktop"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"category"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"event_type"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"tags"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"location"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"category_id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"website"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"address"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"city"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"state"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"zip"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"latitude"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"longitude"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"description"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"photo"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"thumb_small"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"thumb_medium"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"tags"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"created_at"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"updated_at"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"bands"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"name"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"photo"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"spotify_url"},arguments:[],directives:[]}]}}]}}]}}]}}]}}]}}],loc:{start:0,end:1544}};n.loc.source={body:"query eventsByCategory($slug: String!, $start_date: String!, $end_date: String!) {\n  eventsByCategory(slug: $slug, start_date: $start_date, end_date: $end_date) {\n    category {\n      id\n      name\n      slug\n      is_default\n      photo\n      created_at\n      updated_at\n    }\n    events {\n      label\n      days {\n        date\n        events {\n          id\n          name\n          slug\n          location_id\n          user_id\n          category_id\n          event_type_id\n          start_date\n          end_date\n          price\n          start_time\n          end_time\n          short_description\n          description\n          featured\n          is_sold_out\n          website\n          is_family_friendly\n          photo\n          thumb_mobile\n          thumb_tablet\n          thumb_desktop\n          category {\n            name\n            slug\n          }\n          event_type\n          tags {\n            name\n            slug\n          }\n          location {\n            id\n            name\n            slug\n            category_id\n            website\n            address\n            city\n            state\n            zip\n            latitude\n            longitude\n            description\n            photo\n            thumb_small\n            thumb_medium\n            tags {\n              name\n              slug\n            }\n            created_at\n            updated_at\n          }\n          bands {\n            id\n            name\n            slug\n            photo\n            spotify_url\n          }\n        }\n      }\n    }\n  }\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};var d={};function r(e,t){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==t)return element}}n.definitions.forEach(function(e){if(e.name){var t=new Set;!function e(t,n){if("FragmentSpread"===t.kind)n.add(t.name.value);else if("VariableDefinition"===t.kind){var d=t.type;"NamedType"===d.kind&&n.add(d.name.value)}t.selectionSet&&t.selectionSet.selections.forEach(function(t){e(t,n)}),t.variableDefinitions&&t.variableDefinitions.forEach(function(t){e(t,n)}),t.definitions&&t.definitions.forEach(function(t){e(t,n)})}(e,t),d[e.name.value]=t}}),e.exports=n,e.exports.eventsByCategory=function(e,t){var n={kind:e.kind,definitions:[r(e,t)]};e.hasOwnProperty("loc")&&(n.loc=e.loc);var l=d[t]||new Set,o=new Set,m=new Set;for(l.forEach(function(e){m.add(e)});m.size>0;){var c=m;m=new Set,c.forEach(function(e){o.has(e)||(o.add(e),(d[e]||new Set).forEach(function(e){m.add(e)}))})}return o.forEach(function(t){var d=r(e,t);d&&n.definitions.push(d)}),n}(n,"eventsByCategory")},410:function(e,t,n){"use strict";n.r(t);n(52),n(31),n(27),n(16),n(42);var d=n(28),r=(n(53),n(19),n(6)),l=n(24),o=n(0),m=n.n(o),c=n(23),v=n.n(c),k=n(76),_=n.n(k),h=n(380),f=n.n(h),y=n(374),N=n(373);function C(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable})),t.push.apply(t,n)}return t}var F,D={name:"category-show",head:function(){return{title:this.title,meta:[{hid:"description",name:"description",content:this.description}]}},scrollToTop:!0,asyncData:(F=Object(r.a)(regeneratorRuntime.mark(function e(t){var n,d,r,l,o,c,v,k;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.$axios,d=t.$payloadURL,r=t.route,l=t.app,o=t.params,c=t.payload,void 0===d){e.next=5;break}return e.next=4,n.$get(d(r));case 4:return e.abrupt("return",e.sent);case 5:if(!c){e.next=7;break}return e.abrupt("return",c);case 7:return o.start_date||(o.start_date=m()().startOf("day").format("YYYY-MM-DD")),o.end_date||(o.end_date=m()().add(10,"day").format("YYYY-MM-DD")),v=l.apolloProvider.defaultClient,k={eventsByCategory:{}},e.next=13,v.query({query:f.a,variables:o,watchLoading:function(e){e?this.startLoading():this.stopLoading()}}).then(function(e){return e.data.eventsByCategory});case 13:return k.eventsByCategory=e.sent,e.abrupt("return",k);case 15:case"end":return e.stop()}},e)})),function(e){return F.apply(this,arguments)}),components:{FilterByDate:y.a,EventsList:N.a},computed:{category:function(){return v()(this.eventsByCategory,"category",{})},events:function(){return v()(this.eventsByCategory,"events",{})},hasEvents:function(){return!_()(this.events)},hasCategory:function(){return!_()(this.category)},title:function(){return this.hasCategory?"Atlanta Events - ".concat(this.category.name," | FunInATL"):null},description:function(){return this.hasCategory?"Atlanta events for category ".concat(this.category.name,"."):null},isCustomDatesChoosen:function(){var e=this.start_date_original!==this.start_date,t=this.end_date_original!==this.end_date;return e||t}},apollo:{eventsByCategory:{prefetch:function(e){var t=e.route;return{slug:t.params.slug,start_date:v()(t.params,"start_date",null),end_date:v()(t.params,"end_date",null)}},variables:function(){return{slug:this.$route.params.slug,start_date:this.start_date,end_date:this.end_date}},query:f.a,watchLoading:function(e){e?this.startLoading():this.stopLoading()},skip:function(){return this.hasEvents&&this.hasCategory&&!this.isCustomDatesChoosen}}},data:function(){return{start_date:m()().startOf("day").format("YYYY-MM-DD"),end_date:m()().add(10,"day").format("YYYY-MM-DD"),start_date_original:m()().startOf("day").format("YYYY-MM-DD"),end_date_original:m()().add(10,"day").format("YYYY-MM-DD")}},methods:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?C(source,!0).forEach(function(t){Object(d.a)(e,t,source[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):C(source).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))})}return e}({},Object(l.b)("site",["startLoading","stopLoading"]),{updateDate:function(e,t){var n=m()(t).format("YYYY-MM-DD");this.$set(this,e,n)},jumpToDate:function(e){var t="events-".concat(e);document.getElementById(t).scrollIntoView()}})},x=n(35),component=Object(x.a)(D,function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.hasCategory?n("div",[n("filter-by-date",{on:{change:e.updateDate}}),e._v(" "),n("h1",{staticClass:"title is-1 is-size-1-desktop is-size-3-tablet has-text-centered pt-2"},[e._v("\n    "+e._s(e.category.name)+"\n  ")]),e._v(" "),e.hasEvents?n("div",{staticClass:"centered-container pl-computer-4 pr-computer-4 pl-handheld-1 pr-handheld-1 pt-0"},e._l(e.events,function(t,d){return n("div",{key:t.label},[n("h3",{staticClass:"subtitle has-text-centered is-2 mt-4"},[e._v("\n        "+e._s(t.label)+"\n      ")]),e._v(" "),t.days&&t.days.length?e._l(t.days,function(t){return n("div",{key:t.date,attrs:{id:"events-"+t.date}},[n("nav",{staticClass:"level"},[n("div",{staticClass:"level-left"},[n("h4",{staticClass:"subtitle is-4 mb-2 mt-mobile-2 mt-tablet-3 mt-computer-3"},[e._v("\n                "+e._s(e._f("dayOfWeek")(t.date))+"\n              ")])])]),e._v(" "),n("events-list",{attrs:{events:t.events}})],1)}):e._e()],2)}),0):e._e()],1):e._e()},[],!1,null,null,null);t.default=component.exports}}]);