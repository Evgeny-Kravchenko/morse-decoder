const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    let arr = [];                                                       //Массив для преобразованных значений
    let start = 0;                                                     //Начало первой десятки
    let end = 10;                                                     //Конец первой десятки
    for(let i = 0; i < Math.ceil(expr.length/10); i++) {            //Проходим циклом по всем значениям (колличество циклов = длинна аргумента/10 и округляем в большую сторону, если есть десятка, где значения меньше 10)
        let tenChar = expr.slice(start, end);                      //Выбираем первую десятку из строки значений
        if(tenChar.length < 10) {                                 //Если символов меньше 10, то добавляем слева столько 0, чтобы было 10 символов
            let lengthTenChar = tenChar.length;                  //Сохраняем длинну массива десятки в переменную
            for(let i = 0; i < 10 - lengthTenChar; i++) {       //Запускаем цикл добавления нулей слева
                tenChar = "0" + tenChar;                       
            }
        }
        let str = "";                                          //Строка для значений в виде точек и тире
        for(let j = 0; j < 10; j = j + 2) {                    //Проверяем каждые два значения десятки
            if(tenChar == "**********") {                      //Если в десятке ********* то добавляем в массив преобразованных значений пробел и выходим из цикла
                arr.push(" ");
                break; 
            }
            let twoChar = tenChar.slice(j, j + 2);             //Получаем первые два значения десятки
            if(twoChar == "00") continue;                      //Делаем сравнение двух значений десятки с предпологаемыми величинами и добавляем преобразованную величину в строку для значений в виде точек и тире
            if(twoChar == "10") {
                str += ".";
                continue;
            }
            if(twoChar == "11") {
                str += "-";
            }
        }
        arr.push(str);                                          //Добавляем в массив найденную строку десятки в виде точек и тире
        start = end;
        end += 10;
    }
    arr = arr.map(function(item, index, array) {                //Проходим по всему циклу и выводим массив найденных значений по соответствию ключ значение
        for(key in MORSE_TABLE) {
        if(item == key) return MORSE_TABLE[key];
        if(item == " ") return " ";
        }
    })
    return arr.join("");                                            //Соединяем массив значений в слово
}

module.exports = {
    decode
}