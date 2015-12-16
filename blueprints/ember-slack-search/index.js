/*jshint node:true*/
module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function(options) {
    return this.addBowerPackageToProject('eonasdan-bootstrap-datetimepicker', '4.17.37');
  }
};
