const hbs = require('hbs');

hbs.registerHelper('Rol', function (conditional, options) {
    if (options.hash.value === conditional) {
      console.log(options.fn(this));
      return options.fn(this)
    } else {
      return options.inverse(this);
    }
});
hbs.registerHelper('cursoDisponible', function (conditional, options) {

  if (options.hash.value === conditional) {
    return options.fn(this)
  } else {
    return options.inverse(this);
  }
});


