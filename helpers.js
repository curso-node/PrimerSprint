const hbs = require('hbs');

hbs.registerHelper('Rol', function (conditional, options) {
    if (options.hash.value === conditional) {
      return options.fn(this)
    } else {
      return options.inverse(this);
    }
  });
