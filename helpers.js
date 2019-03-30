const hbs = require('hbs');

const menus = [
    {
        menu: 1
    },
    {
        menu : 2
    },
    {
        menu : 3
    }
]

hbs.registerHelper('userCanSee', function(context, options) {

    console.log(context.data.key);
    if(context.data.key == 'rol'){
        console.log('rol de coordinador', context.data.key);
    }
   

  });
