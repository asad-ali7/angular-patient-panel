'use strict';

let hash = {
    errHandler: (param) => {
        let errorContainer = '';
        let counter = 0;
        for (var key in param.errors) {
            counter++;
            errorContainer += counter + ': ' + param.errors[key].path + ' violates the ' + param.errors[key].kind + ' constraint.' + '\n';
        }
        return errorContainer;

    }
}
module.exports = hash;