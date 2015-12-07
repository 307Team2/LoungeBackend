#Node Style Guide

This style guide is intended to increase the readability of all code in this respository by ensuring that certain standards are followed.

###Formatting 

#####Line Length
The maximum length of a single line of code should not exceed 80 characters.

#####Indentation 
Indentation should always be 4 spaces. The tab key should not be used to indent code.

#####Whitespace and newlines
`\n` should always be used as the newline character. `\r\n` should not be used.

There should be no trailing whitespace or newlines at the end of any line of code or at the end of a file.

#####Braces and Parentheses
Opening braces should be placed on the same line as the expression that precedes them.

<i>Correct:</i>
```
if (true) {
  console.log('Correct');
}
```
<i>Incorrect:</i>
```
if (true)
{
  console.log('Incorrect');
}
```
Closing parentheses and braces should be grouped on the same line.

<i>Correct:</i>
```
res.json({
  user: req.user,
  token: token
});
```
<i>Incorrect:</i>
```
res.json(
{
  user: req.user,
  token: token
}
);
```

###Variables
Lower camel case should be used for all variable declarations.

<i>Correct:</i>
```
const newVariable = 1;
```
<i>Incorrect:</i>
```
const new_variable = 1;
const new-variable = 1;
```

Variable names should not exceed 4 words, for readability.

<i>Correct:</i>
```
const newPerson = 'Evan';
```
<i>Incorrect:</i>
```
const newPersonNameDataInitial = 'Evan';
```

Variables should match the number of the object type they represent.

<i>Correct:</i>
```
const user = 'Evan';
const users = [];
```

Only declare one variable per var keyword.

<i>Correct:</i>
```
var firstValue = 1;
var otherValues = [10, 20];
```
<i>Incorrect:</i>
```
var firstValue = 1,
    otherValues = [10, 20];
```

For objects and arrays, place opening and closing syntax on the same line, if it is a short declaration.

<i>Correct:</i>
```
var object = ['good', 'object'];
```
<i>Incorrect:</i>
```
var oneObject = [
  'bad', 'object'
];

var anotherObject = [
  'still',
  'bad',
  'object'
];
```

###Objects
Use literal syntax to create objects.

<i>Correct:</i>
```
const object = {};
```
<i>Incorrect:</i>
```
const object = new Object();
```
###Arrays
Use literal syntax to create arrays

<i>Correct:</i>
```
const array = [];
```
<i>Incorrect:</i>
```
const array = new Array();
```

###Functions

Functions should be kept as short as possible to increase readability. Any major service should be broken out into a seperate function. 

###Properties

Use dot notation to access the properties of variables.

<i>Correct:</i>
```
var event = {
  name: 'Fun Event',
  time: '6:00pm',
};

const eventTime = event.time;
```
<i>Incorrect:</i>
```
var event = {
  name: 'Fun Event',
  time: '6:00pm',
};

const eventTime = event['time'];
```

This style guide was influenced by several well-written style guides. The most influential were:

https://github.com/airbnb/javascript

https://github.com/felixge/node-style-guide
