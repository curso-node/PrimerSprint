const hbs = require('hbs');

hbs.registerHelper('Rol', function (conditional, options) {
// Object.keys(this.datos).forEach((v) => {
//   console.log(v, this.datos[v])
// })

    if (options.hash.value === conditional) {
      console.log(options.fn(this));
      return options.fn(this)
    } else {
      return options.inverse(this);
    }
  });