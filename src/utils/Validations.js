/**
 * 
 * @param {array} inputsarray Arrat of inputs
 * @param {array} valuesarray Array obout the details of inputs array
 * @returns This method return a message error of empty fields of the inputs
 */
function InputsValidate(inputsarray, valuesarray){
    var i = 0
    var cont_toast = []
    inputsarray.forEach(element => {
        var s = element.toString();
        if (s.length===0){
            var messages = {severety:'error', summary:'Empty fields!', detail:"Empty input! Please enter you " + valuesarray[i], life: 2000}
            cont_toast.push(messages)
        }
        i++
    });
    return cont_toast
}

/**
 * 
 * @param {string} date This is a date of type string on format 'dd/mm/yyyy'
 * @returns This method return a date converted to string on format 'yyyy/mm/dd'
 */
function myDate(date) {
    date = date.toString()
    var array = date.split("/")
    return array[2]+"/"+array[1]+"/"+array[0]
}
/*
var a = ['Mario', '', '0979432426', '02/02/1999', '']
var b = ['First Name', 'Last Name', 'Phone', 'Date Born', 'Addres']
var x = InputsValidate(a, b)
console.log(x[0].summary)
*/
export {InputsValidate, myDate} 