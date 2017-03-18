(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['boards'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <li class=\"board\" data-id="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n      <a href=\"/boards/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n        "
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "\n      </a>\n    </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<header class=\"clearfix\">\n  <span class=\"icon-lg icon-star\"></span>\n  <h3 class=\"boards-section-header\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h3>\n</header>\n<ul class=\"boards\" id=\"boards-"
    + alias3((helpers.lowerCase || (depth0 && depth0.lowerCase) || alias2).call(alias1,(depth0 != null ? depth0.name : depth0),{"name":"lowerCase","hash":{},"data":data}))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.boards : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <li class=\"new-board\">\n    <a href=\"boards/new\">Create new board...</a>\n  </li>\n</ul>";
},"useData":true});
templates['nav'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<header>\n  <a class=\"logo-white dashboard\" href=\"/\">\n    <img src=\"/images/trello-logo-white.svg\" alt=\"logo\">\n  </a>\n  <div class=\"header-boards header-box mod-left\" data-user="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n    <a class=\"header-btn\" href=\"/boards\">\n      <span class=\"logo-white icon\">logo</span><!--\n      --><span>Boards</span>\n    </a>\n  </div>\n  <div class=\"header-search header-box mod-left\" data-user="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n    <input class=\"search-box\" type=\"text\">\n    <span class=\"icon-lg icon-search\"></span>\n    <a class=\"icon-lg icon-external-link hide\" href=\"/search\"></a>\n    <span class=\"icon-lg icon-close hide\"></span>\n  </div>\n  <div class=\"header-box header-icon icon-lg icon-notification mod-right\"></div>\n  <div class=\"header-box header-icon icon-lg icon-information mod-right\"></div>\n  <div class=\"header-user header-box mod-right\" data-user="
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\n    <img src=\""
    + alias4(((helper = (helper = helpers.profilePic || (depth0 != null ? depth0.profilePic : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profilePic","hash":{},"data":data}) : helper)))
    + "\" alt=\"Profile Pic\"><!--\n    --><span>"
    + alias4(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"firstName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"lastName","hash":{},"data":data}) : helper)))
    + "</span>\n  </div>\n  <div class=\"header-box header-icon icon-lg icon-add mod-right\"></div>\n</header>";
},"useData":true});
})();