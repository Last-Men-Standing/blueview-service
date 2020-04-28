<h2 align="center"> BlueView Full Stack JavaScript Style Guide </h2>


#### Spacing
- A standard spacing width of 2 spaces is required

#### Semicolons
-  Variable declarations and function calls shall end with a semiclolon

#### Line length
- All code shall confine to the 80 character maximum width per line


#### Curly Braces
- Opening braces shall go on the same line as the statement

```javascript
function test(){
	console.log("Hello world!");
}

```

#### Naming conventions
- Objects and complex data types shall use standard lower camel case
- Primitive data types and strings may use snake case
- Class names shall be capital camel case

```javascript
const objectOrArray = {};
const some_string = "Hey Man";
const someClass = new SomeClass();

```

#### Variable data types
- Variables shall use `const` whenever possible
- Variables may use `let` if required (ex loop)

```javascript
const some_id = 99;
let increment = 0;
```
