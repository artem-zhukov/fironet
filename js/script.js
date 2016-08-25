var dayWeeks = {
    Пн: 0,
    Вт: 1,
    Ср: 2,
    Чт: 3,
    Пт: 4,
    Сб: 5,
    Вс: 6
};

var dayWeeksArray = [];
var result = "";
var prevTime = 0;
var weekday = -1;
var prevDay;
var HALF_HOUR = 70;

function run() {
    var data = document.getElementById('input').value;
    data = data.split(', ');

    /*
     Парсим строку в массив
     */
    data.forEach(function (item) {
        var day = item.split(': ');
        for (var key in dayWeeks) {
            if (key == day[0]) {
                if (day[1].length < 5) {
                    day[1] = 0 + day[1];
                }
                day[1] = day[1].replace(':', "");
                dayWeeksArray.push((dayWeeks[key]) + day[1]);
                break;
            }
        }
    });

    dayWeeksArray = bubbleSort(dayWeeksArray);
    var difBetweenDate = 0;
    reduce(difBetweenDate);

    document.getElementById("output").innerHTML= result;
    dayWeeksArray = [];
    result="";
}

/*
 Сравнение между собой дня недели и времени
 */
function reduce(difBetweenDate) {
    dayWeeksArray.reduce(function (prev, current) {

        difBetweenDate = current - prev;

        if (difBetweenDate <= HALF_HOUR) {
            prevTime = prev;
        } else if (difBetweenDate >= HALF_HOUR+1) {
            if (prevTime != 0) {
                prevTime = prev;
                processing(prevTime.slice(0), "-");
                prevTime = 0;
                if (prevDay === current.charAt(0)) {
                    processing(current, ", ");
                }else {
                    processing(current, "; ");
                }
            } else if (prevDay === current.charAt(0)) {
                processing(current, ", ");
            } else {
                processing(current, "; ");
            }

        }
        prevDay = current.charAt(0);
        return prev = current;
    }, 0);
}

/*
 Сортировка массива
 */
function bubbleSort(A) {
    var n = A.length;
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - 1 - i; j++) {
            if (A[j + 1] < A[j]) {
                var t = A[j + 1];
                A[j + 1] = A[j];
                A[j] = t;
            }
        }
    }
    return A;
}

/*
 Запись времени в результат
 */
function processing(dTime, symbol) {
    if (result.length != 0) {
        result += symbol;
    }
    DetermineDayWeek(dTime);
    result += dTime.slice(1, 3) + ':' + dTime.slice(-2);
}

/*
 Определения дня недели для строки с результатом
 */
function DetermineDayWeek(dTime) {
    for (var key in dayWeeks) {
        if (dayWeeks[key] == dTime.charAt(0)) {
            if (weekday != dayWeeks[key]) {
                result += key + ": ";
            }
            weekday = dayWeeks[key];
        }
    }
}

