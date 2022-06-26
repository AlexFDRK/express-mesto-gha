class SomeError extends Error {};
class AnotherError extends Error {};
class ChildOfAnotherError extends AnotherError;

let someError = new SomeError("Ошибка SomeError")
let anotherError = new AnotherError("Ошибка AnotherError")
let childOfAnotherError = new ChildOfAnotherError("Ошибка-наследник AnotherError")

// Вернет true, someError - экземпляр SomeError
console.log(someError instanceof SomeError)

// Вернет false, anotherError - экземпляр AnotherError, а не SomeError
console.log(anotherError instanceof SomeError)

// Вернет true, childOfAnotherError - экземпляр ChildOfAnotherError
// а ChildOfAnotherError - наследник AnotherError
console.log(childOfAnotherError instanceof AnotherError)

// Вернет true, childOfAnotherError - экземпляр ChildOfAnotherError
console.log(childOfAnotherError instanceof ChildOfAnotherError)
