// Arrow functions provide a more direct way of dealing with this. Since their this value is determined based on the lexical scope, the inner function called in forEach can now access the properties of the outer printNumbers object, as demonstrated:

const printNumbers = {
  phrase: 'The current value is:',
  numbers: [1, 2, 3, 4],

  loop() {
    this.numbers.forEach((number) => {
      console.log(this.phrase, number)
    })
  },
}

printNumbers.loop()
This will give the expected result:

Output
The current value is: 1
The current value is: 2
The current value is: 3
The current value is: 4
These examples establish that using arrow functions in built-in array methods like forEach, map, filter, and reduce can be more intuitive and easier to read, making this strategy more likely to fulfill expectations.

// Arrow Functions as Object Methods
// While arrow functions are excellent as parameter functions passed into array methods, they are not effective as object methods because of the way they use lexical scoping for this. Using the same example as before, take the loop method and turn it into an arrow function to discover how it will execute:

const printNumbers = {
  phrase: 'The current value is:',
  numbers: [1, 2, 3, 4],

  loop: () => {
    this.numbers.forEach((number) => {
      console.log(this.phrase, number)
    })
  },
}
// In this case of an object method, this should refer to properties and methods of the printNumbers object. However, since an object does not create a new lexical scope, an arrow function will look beyond the object for the value of this.

// Call the loop() method:

printNumbers.loop()
This will give the following:

Output
Uncaught TypeError: Cannot read property 'forEach' of undefined
Since the object does not create a lexical scope, the arrow function method looks for this in the outer scope–Window in this example. Since the numbers property does not exist on the Window object, it throws an error. As a general rule, it is safer to use traditional functions as object methods by default.

Arrow Functions Have No constructor or prototype
The Understanding Prototypes and Inheritance in JavaScript tutorial earlier in this series explained that functions and classes have a prototype property, which is what JavaScript uses as a blueprint for cloning and inheritance.

To illustrate this, create a function and log the automatically assigned prototype property:

function myFunction() {
  this.value = 5
}

// Log the prototype property of myFunction
console.log(myFunction.prototype)
This will print the following to the console:

Output
{constructor: ƒ}
This shows that in the prototype property there is an object with a constructor. This allows you to use the new keyword to create an instance of the function:

const instance = new myFunction()

console.log(instance.value)
This will yield the value of the value property that you defined when you first declared the function:

Output
5
In contrast, arrow functions do not have a prototype property. Create a new arrow function and try to log its prototype:

const myArrowFunction = () => {}

// Attempt to log the prototype property of myArrowFunction
console.log(myArrowFunction.prototype)
This will give the following:

Output
undefined
As a result of the missing prototype property, the new keyword is not available and you cannot construct an instance from the arrow function:

const arrowInstance = new myArrowFunction()

console.log(arrowInstance)
This will give the following error:

Output
Uncaught TypeError: myArrowFunction is not a constructor
This is consistent with our earlier example: Since arrow functions do not have their own this value, it follows that you would be unable to use an arrow function as a constructor.

As shown here, arrow functions have a lot of subtle changes that make them operate differently from traditional functions in ES5 and earlier. There have also been a few optional syntactical changes that make writing arrow functions quicker and less verbose. The next section will show examples of these syntax changes.

Implicit Return
The body of a traditional function is contained within a block using curly brackets {} and ends when the code encounters a return keyword. The following is what this implementation looks like as an arrow function:

const sum = (a, b) => {
  return a + b
}
Arrow functions introduce concise body syntax, or implicit return. This allows the omission of the curly brackets and the return keyword.

const sum = (a, b) => a + b
Implicit return is useful for creating succinct one-line operations in map, filter, and other common array methods. Note that both the brackets and the return keyword must be omitted. If you cannot write the body as a one-line return statement, then you will have to use the normal block body syntax.

In the case of returning an object, syntax requires that you wrap the object literal in parentheses. Otherwise, the brackets will be treated as a function body and will not compute a return value.

To illustrate this, find the following example:

const sum = (a, b) => ({result: a + b})

sum(1, 2)
This will give the following output:

Output
{result: 3}
// Omitting Parentheses Around a Single Parameter
// Another useful syntactic enhancement is the ability to remove parentheses from around a single parameter in a function. In the following example, the square function only operates on one parameter, x:

const square = (x) => x * x
// As a result, you can omit the parentheses around the parameter, and it will work just the same:

const square = x => x * x

square(10)
// This will give the following:

Output
100
//  if a function takes no parameters, parentheses will be required:
