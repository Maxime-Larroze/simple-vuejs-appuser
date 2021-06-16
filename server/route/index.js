"use strict";
const Data = require("../controller/controller");
const path = require("path");

module.exports = function(app) {
  app.route("/api").get(function(req, res) {
    res.sendFile(path.resolve("server/web/index.html"));
  });
  app.route("/api/test").get(Data.test);
  //   app.route('/users/:id').get(Users.FindById).delete(Users.Delete).put(Users.Update);
  //   app.route('/documents').get(Users.FindAllDocuments).post(Users.Upload);
  //   app.route('/documents/:id').delete(Users.DeleteDocumentByID).get(Users.FindDocumentById);
};
