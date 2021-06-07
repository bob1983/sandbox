let temp;
document.addEventListener('DOMContentLoaded', event => {
    const Onsen = require('onsen-node');

    Onsen.getList(list => {
        if (list) {
            console.log(`List ${list}`);
            temp = list;
        }
    });
});
