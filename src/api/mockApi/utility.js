const firstNamesWomen = [
    "Astrid", "Maja", "Alma", "Vera", "Freja",
    "Matilda", "Lisa", "Lena", "Gunilla", "Helen", 
    "Leah", "Ella", "Alice", "Selma", "Lilly",
    "Maria", "Elisabeth", "Anna", "Kristina", "Eva"
];

const firstNamesMen = [
    "Kalle", "Pelle", "Ville", "Goran", "Mats",
    "Noah", "Hugo", "William", "Liam", "Nils", 
    "Elias", "Karl", "Erik", "Lars", "Anders",
    "Oliver", "Adam", "August", "Sam", "Alfred"
];

const lastNames = [
    "Andersson", "Johansson", "Karlsson", "Nilsson", "Eriksson",
    "Larsson", "Olsson", "Persson", "Svensson", "Gustafsson", 
    "Pettersson", "Jonsson", "Hansson", "Bengtsson", "Jonsson",
    "Lindberg", "Jacobsson", "Magnusson", "Lindstrom", "Olofsson"
];

export function getRandomInt(max) {
    let value = Math.floor(Math.random() * (max + 1));
    return value
}

export function getFirstName(gender) {
    if (gender == 'K') {
        return firstNamesWomen[getRandomInt(firstNamesWomen.length - 1)];
    }
    return firstNamesMen[getRandomInt(firstNamesMen.length - 1)];
}

export function getLastName() {
    return lastNames[getRandomInt(lastNames.length - 1)];
}

export function getGender() {
    if (getRandomInt(2) === 1)  {
        return "K";
    }
    return "M"
}

export function getPhoneNumber() {
    var phoneNumber = "070";
    for (var i = 0; i < 7; ++i) {
        phoneNumber += (getRandomInt(10)).toString();
    }
    
    return phoneNumber;
}
