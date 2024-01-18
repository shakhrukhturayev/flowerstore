const moment = require('moment')

const HelperHandlebars = {
    ifequal(a,b,options){
       if(a==b){
        return options.fn(this)
       }
       return  options.inverse(this)
    },
    GetFirstLetter(firstname,lastname){
        return firstname.charAt(0)+lastname.charAt(0)
    },
    formatDate(date){
    return moment(date).format('DD MMM, YYYY') // 2ta MM bulsa 11- 3 ta MMM bulsa nomi NOV
    }

}

module.exports = {HelperHandlebars}