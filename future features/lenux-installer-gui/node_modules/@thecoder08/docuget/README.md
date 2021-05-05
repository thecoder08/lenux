# Docuget
## What is Docuget?
Docuget is a wrapper for `document.querySelector()` which makes it easy to select elements in the DOM.
## Installation
Run the command
```shell
npm i @thecoder08/docuget
```
to install Docuget.
## Require
Require with this code:
```html
<script src="node_modules/@thecoder08/docuget/main.js"></script>
```
## Syntax
```javascript
$(query);
```
Where `query` is the CSS selector to select the element.  
Use `#elementID` to select an element by its ID.  
Use `.elementClass` to select an element by its class.  
Use `[attribute=value]` to select an element by the value one of its attributes has.  
Use `element` to select an element by its type.  
Returns: the first element that matches the query.
## Example
Select an element by its ID and change its text.
```javascript
$('#myElement').innerHTML = 'Hello World!';
```
as opposed to:
```javascript
document.getElementById('myElement').innerHTML = 'Hello World!';
```
or:
```javascript
document.querySelector('#myElement').innerHTML = 'Hello World!';
```
