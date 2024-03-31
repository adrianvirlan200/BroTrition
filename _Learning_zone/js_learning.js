//Comment
console.log("Hello World from JavaScript");

//!Variable declaration
// var varName -> global scope
// let varName -> for string, number, boolean, undefined variables
// const varName -> for constant variables

let name1 = "string var test";
const interestRate = 0.3;
//it generates an error because we are trying to change a constant variable
//interestRate = 1;

console.log(interestRate);
console.log(name1);

// using type of in the console we can find out the type of a variable that we used
// for instance: typeof name1 will return string, whilst typeof interestRate will return number

//!OBJECTS

//by declaring a variable value between {}, we crete a variable literal
//? some sort of an object
let person = {
    //declare the fields in the object this way
    name1: "Mosh",
    age: 30,
};
//accessing  fields in the object using dot
person.name1 = "nameChangingTest";

//accessing fields in the object using []
//also, it's a good practice to declare a selection variable
let selection = "age"; //we can change it at runtime
person[selection] = 100;

//we can add new fields into the object
person.weight = 40;
//or
person["height"] = 190;

//we can also delete a filed from an object
delete person.name1;

console.log(person);

//!Arrays
//declaration of empty array, or we can add some items
//[] are called array literal
let selectedColors = ["red", "green", "blue"];

//indexing starts from 0
//accessing an element based of its index
selectedColors[0] = "yellow";

//we can add elements in the array:
selectedColors[3] = "red";

//an array can contain elements of different types
selectedColors[4] = 20;

// if we use typeof array we will find out that an array in just
//an object in javascript

console.log(selectedColors);
console.log(selectedColors.length);

//!functions

//function declaration
function greet(name) {
    console.log("Hello from function, " + name);
} //? functions don t need ; at the end

//function call
greet("Adi");

//!function that returns a value

function calc_sqrt(number) {
    return number * number;
}

let fcs_output = calc_sqrt(selectedColors.length);
console.log(fcs_output);

//!simulating a stack using arrays

let stack = [];

//pushing elements in the queue
for (let i = 0; i < 10; i++) {
    stack.push(i);
}

//popping elements form the stack
let last_element_in_the_stack = stack.pop();
console.log("Last element in the stack: " + last_element_in_the_stack);

//!simulating a queue using arrays

let queue = [];
//enqueue(we actually push like in a stack, but when we dequeue we make shore the right element is selected)
for (let i = 0; i < 10; i++) {
    queue.push(i);
}

//dequeue
//the .shift method return the first element of the queue
//the .unshift method allows us to insert an element in the beginning of the array
let first_in_queue = queue.shift();
console.log("Queue output: " + first_in_queue);

//! Simulating multi-dimensional arrays
let multi_dim = [
    ["name", 30],
    ["name2", 20],
    ["name3", 10],
];

console.log(multi_dim[1][0] + " " + multi_dim[1][1]);

//!scope testing

//both var and let variables can be seen inside a function if they are
//declared globally
var test1 = 10000;
let test2 = 2000;

function test_scope() {
    console.log(test1);
    console.log(test2);
}

test_scope();

//! IF, FOR, WHILE, DO...WHILE statements

function loops(arg1, arg2) {
    if (arg1 < 0 || arg2 < 0) {
        return 1;
    }

    for (let i = 0; i < 100; i++) {
        //something
    }

    let iterator = 0;
    while (iterator < 100) {
        //something

        iterator++;
    }

    iterator = 0;
    do {
        //something
        iterator++;
    } while (iterator == 100);

    return arg1 + arg2;
}

//!Freezing an object
//even when declaring an object with const keyword, we still
//can modify its attributes(object mutation)
//in order to prevent this, we can use the Object.freeze()
//function, that will not allow us to change any attributes

let object_example = {
    name: "AAA",
    age: 20,
    other_field: 20.22,
};

Object.freeze(object_example);
object_example.age = 30;
//we can observe that no error is returned, but
//the value of the age field is still 20, even
//after the assign line from above
console.log(object_example.age);

//! Arrow functions
//Arrow functions are a more concise way to write function expressions
//they are especially useful for non-method functions, and they cannot be used as constructors

hello = () => {
    return "Hello World from arrow function!";
};
console.log(hello());

//if the function has only one statement, and the statement returns a value, we can omit the curly braces and the return keyword
hello = () => "Hello World from arrow function!";

//arrow functions that take parameters

hello = (param) => "Hello " + param + ", from arrow function!";

console.log(hello("Adi"));
