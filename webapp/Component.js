// sap.ui.loader.config({
// 	paths: {
// 		"HelloDialog": "/css/lib/webapp/Controller/HelloDialog",
//     "css":"https://raw.githubusercontent.com/DatKartoffel/Test/main/test",
//     "aaa": "https://raw.githubusercontent.com/DatKartoffel/Test/main/test1",
//     "bbb": "https://raw.githubusercontent.com/DatKartoffel/Test/main/test3",
//     "ccc": "https://raw.githubusercontent.com/DatKartoffel/Test/main/test4"
// 	},
// 	async: true
// });

sap.ui.loader.config({

  // location from where to load all modules by default
  baseUrl: '../../resources/',

  paths: {
    // load modules whose ID equals to or starts with 'my/module' from example.com
    'my/module': 'https://example.com/resources/my/module'
  },

  map: {
    // if any module requires 'sinon', load module 'sap/ui/thirdparty/sinon-4'
    '*': {
      'sinon': 'sap/ui/thirdparty/sinon-4'
    },
    // but if a module whose ID equals to or starts with 'app' requires 'sinon'
    // then load a legacy version instead
    "app": {
      'sinon': 'sap/ui/legacy/sinon'
    }
  },

  // define two bundles that consists of JS modules only
  bundles: {
    bundle1: ['module1', 'module2'],
    bundle2: ['moduleX', 'moduleY']
  },

  // define a bundle that also contains non-JS resources
  bundlesUI5: {
    'all.js': ['Component.js', 'manifest.json',
               'App.controller.js', 'App.view.xml']
  },

  // activate real async loading and module definitions
  async: true,

  // provide dependency and export metadata for non-UI5 modules
  shim: {
    'sap/ui/thirdparty/blanket': {
      amd: true,
      exports: 'blanket'
    }
  }

});

sap.ui.define(
  [
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    // "./css/lib/webapp/Controller/HelloDialog",
    // "./css/lib/webapp/Controller/BusinessProcess.controller",
    // "./css/lib/webapp/Controller/BusinessProcessDetail.controller",
    // "./css/lib/webapp/Controller/test",
    // "./css/lib/webapp/Controller/test1",
    "HelloDialog",
    "css",
    "aaa",
    "bbb",
    "ccc"
    // "https://raw.githubusercontent.com/DatKartoffel/Test/main/test",
    // "https://raw.githubusercontent.com/DatKartoffel/Test/main/test1",
    // "https://raw.githubusercontent.com/DatKartoffel/Test/main/test3",
    // "https://raw.githubusercontent.com/DatKartoffel/Test/main/test4"
  ],
  function (UIComponent, JSONModel, HelloDialog, css, aaa, bbb, ccc) {
    "use strict";

    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        // call the init function of the parent
        UIComponent.prototype.init.apply(this, arguments);

        // set data model
        var oData = {
          recipient: {
            name: "Daniel",
          },
        };
        var oModel = new JSONModel(oData);
        this.setModel(oModel);

        // set dialog
        this._helloDialog = new HelloDialog(this.getRootControl());
        // create the views based on the url/hash
        this.getRouter().initialize();
      },

      exit: function () {
        this._helloDialog.destroy();
        delete this._helloDialog;
      },

      openHelloDialog: function () {
        this._helloDialog.open();
      },
    });
  }
);
