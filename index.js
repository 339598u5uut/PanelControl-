let arrayObjectsStudents = [{
    name: 'Денис',
    surname: 'Рыбальченко',
    middleName: 'Александрович',
    birth: new Date(1998, 0, 15),
    startEducation: 2020,
    faculty: 'Аэрокосмический факультет',
}, {
    name: 'Михаил',
    surname: 'Сандомирский',
    middleName: 'Евгеньевич',
    birth: new Date(1995, '06', '07'),
    startEducation: 2016,
    faculty: 'Радиотехнический факультет',
}, {
    name: 'Иван',
    surname: 'Черных',
    middleName: 'Михайлович',
    birth: new Date(2000, '03', 11),
    startEducation: 2019,
    faculty: 'Лингвистика',
}, {
    name: 'Анна',
    surname: 'Шипиль',
    middleName: 'Александровна',
    birth: new Date(2005, 11, '03'),
    startEducation: 2021,
    faculty: 'Машиностроительные технологии',
}, {
    name: 'Яна',
    surname: 'Барбашина',
    middleName: 'Андреевна',
    birth: new Date(2001, '02', '04'),
    startEducation: 2019,
    faculty: 'Робототехника и комплексная автоматизация',
}, {
    name: 'Александр',
    surname: 'Сорокин',
    middleName: 'Игоревич',
    birth: new Date(2003, '04', 27),
    startEducation: 2018,
    faculty: 'Информатика и системы управления',
}];

function createRow() {
    const container = document.getElementById('tbody');
    const row = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    row.append(td1);
    row.append(td2);
    row.append(td3);
    row.append(td4);
    container.append(row);
    return { row, td1, td2, td3, td4 };
}

if (localStorage.getItem('newArray') !== null || localStorage.getItem('newArray') !== '') {
    arrayObjectsStudents = localStorage.newArray ? JSON.parse(localStorage.getItem('newArray'), function(key, value) {
        if (key === 'birth') return new Date(value);
        return value;
    }) : arrayObjectsStudents;
}

function createStudent(array) {
    document.getElementById('tbody').innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const now = new Date();
        const addRow = createRow();
        const finishEducation = Number(array[i].startEducation) + Number(4);
        const course = now.getFullYear() - Number(array[i].startEducation);
        addRow.td1.innerHTML = array[i].surname + ' ' + array[i].name + ' ' + array[i].middleName;
        addRow.td2.innerHTML = array[i].faculty;

        let date = array[i].birth.getDate();
        if (date < 10) date = '0' + date;
        let month = array[i].birth.getMonth() + 1;
        if (month < 10) month = '0' + month;
        const year = array[i].birth.getFullYear();
        const born = new Date(year, month, date);
        const getAge = Math.floor((now.getTime() - born.getTime()) / 1000 / 60 / 60 / 24 / 365.25);

        addRow.td3.innerHTML = date + '.' + month + '.' + year + ' ( ' + getAge + ' лет ) ';
        addRow.td4.innerHTML = Number(array[i].startEducation) + ' - ' + finishEducation + ' ( ' + course + ' курс ) ';
        if (course >= 5) {
            addRow.td4.innerHTML = 'закончил';
        }
    }
    return array;
}
createStudent(arrayObjectsStudents);

const newArray = arrayObjectsStudents.slice();
document.querySelector('.table-dark__th-button-name').addEventListener('click', function() {
    const result = newArray.sort((a, b) => (a.surname > b.surname ? 1 : -1));
    createStudent(result);
});

document.querySelector('.table-dark__th-button-faculty').addEventListener('click', function() {
    const result = newArray.sort((a, b) => (a.faculty > b.faculty ? 1 : -1));
    createStudent(result);
});

document.querySelector('.table-dark__th-button-birth').addEventListener('click', function() {
    const result = newArray.sort((a, b) => (a.birth < b.birth ? 1 : -1));
    createStudent(result);
});
document.querySelector('.table-dark__th-button-education').addEventListener('click', function() {
    const result = newArray.sort((a, b) =>
        (a.startEducation < b.startEducation ? 1 : -1));
    createStudent(result);
});

const form = document.querySelector('.form-add');
const fields = form.querySelectorAll('.form-control');
const inputName = document.getElementById('input__name');
const inputFaculty = document.getElementById('input__faculty');
const inputBirth = document.getElementById('input__age');
const inputStartEducation = document.getElementById('input__start-education');
const date = new Date();
let filterArrayObjectsStudents;

function showError(message) {
    const error = document.createElement('div');
    error.classList.add('error');
    error.style.color = 'red';
    error.innerHTML = message;
    return error;
}

function removeError() {
    const errors = form.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
    }
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    removeError();

    function getAgeInForm(birthDate) {
        const now = new Date();
        const born = new Date(
            birthDate.getFullYear(),
            birthDate.getMonth() + 1,
            birthDate.getDate(),
        );
        const diffInMilliseconds = now.getTime() - born.getTime();
        return Math.floor(diffInMilliseconds / 1000 / 60 / 60 / 24 / 365.25);
    }

    function formatDateInForm(dateInForm) {
        let d = dateInForm.getDate();
        if (d < 10) d = '0' + d;
        let m = dateInForm.getMonth() + 1;
        if (m < 10) m = '0' + m;
        const y = dateInForm.getFullYear();
        return d + '.' + m + '.' + y;
    }

    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value.trim() || fields[i].value.length < 3) {
            const error = showError('Поле нужно обязательно заполнить!');
            fields[i].parentElement.insertBefore(error, fields[i]);
            return;
        }
    }

    if (inputBirth.valueAsDate > date) {
        const error = showError('Введите корректную дату!');
        inputBirth.parentElement.insertBefore(error, inputBirth);
        return;
    }
    if (inputStartEducation.value !== '' && inputStartEducation.value < 2000 || inputStartEducation.value > date.getFullYear()) {
        const error = showError('Не ранее 2000г, не позднее текущего года!');
        inputStartEducation.parentElement.insertBefore(error, inputStartEducation);
        return;
    }

    const addRow = createRow();
    addRow.td1.innerHTML = inputName.value;
    addRow.td2.innerHTML = inputFaculty.value;
    addRow.td3.innerHTML = formatDateInForm(new Date(inputBirth.value)) + ' ( ' + getAgeInForm(new Date(inputBirth.value)) + ' лет ) ';
    const finishEducation = Number(inputStartEducation.value) + Number(4);
    const course = date.getFullYear() - Number(inputStartEducation.value) + ' курс ';
    addRow.td4.innerHTML = inputStartEducation.value + ' - ' + finishEducation + ' ( ' + course + ' ) ';
    if (finishEducation < date.getFullYear()) {
        addRow.td4.innerHTML = 'закончил';
    }

    const split = inputName.value.split(' ');
    const studentObject = {};
    studentObject.name = split[1];
    studentObject.surname = split[0];
    studentObject.middleName = split[2];
    studentObject.birth = new Date(inputBirth.value);
    studentObject.startEducation = inputStartEducation.value;
    studentObject.faculty = inputFaculty.value;
    arrayObjectsStudents.push(studentObject);
    newArray.push(studentObject);
    filterArrayObjectsStudents.push(studentObject);
    localStorage.setItem('newArray', JSON.stringify(arrayObjectsStudents));

    inputName.value = '';
    inputFaculty.value = '';
    inputBirth.value = '';
    inputStartEducation.value = '';
});

const inputSearchName = document.getElementById('search-name');
const inputSearchFaculty = document.getElementById('search-faculty');
const inputSearchStartEducation = document.getElementById('search-start-education');
const inputSearchFinishEducation = document.getElementById('search-finish-education');
filterArrayObjectsStudents = arrayObjectsStudents.slice();

function filterFullNameToSubstr(str, object) {
    const fullName = (`${object.surname}${object.name}${object.middleName}`).toLowerCase();
    return fullName.includes(str);
}

function filterFacultyToSubstr(str, object) {
    const faculty = (`${object.faculty}`).toLowerCase();
    return faculty.includes(str);
}

function filterStartEducation(str, object) {
    const startEducation = ((`${object.startEducation}`));
    return startEducation.includes(str);
}

function filterFinishEducation(str, object) {
    const finishEducation = ((`${object.startEducation + Number(4)}`));
    return finishEducation.includes(str);
}

const inputsSearch = document.querySelectorAll('.form-control-input');
for (let i = 0; i < inputsSearch.length; i++) {
    inputsSearch[i].oninput = function() {
        if (inputSearchName.value.toLowerCase() !== '') {
            const substrName = inputSearchName.value.toLowerCase();
            const result = filterArrayObjectsStudents.filter(student =>
                filterFullNameToSubstr(substrName, student));
            createStudent(result);

            if (inputSearchFaculty.value.toLowerCase() !== '') {
                const substrFaculty = inputSearchFaculty.value.toLowerCase();
                const result2 = result.filter(student =>
                    filterFacultyToSubstr(substrFaculty, student));
                createStudent(result2);

                if (inputSearchStartEducation.value.toLowerCase() !== '') {
                    const substrStartEducation = inputSearchStartEducation.value.toLowerCase();
                    const result3 = result2.filter(student =>
                        filterStartEducation(substrStartEducation, student));
                    createStudent(result3);
                    if (inputSearchFinishEducation.value.toLowerCase() !== '') {
                        const substrFinishEducation = inputSearchFinishEducation.value.toLowerCase();
                        const result4 = result3.filter(student =>
                            filterFinishEducation(substrFinishEducation, student));
                        createStudent(result4);
                    }
                }
            }
        }
    };
}