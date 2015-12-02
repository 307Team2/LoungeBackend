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
Camel case should be used for all variable declarations.

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

This style guide was influenced by several well-written style guides. The most influential were:

https://github.com/airbnb/javascript

https://github.com/felixge/node-style-guide
