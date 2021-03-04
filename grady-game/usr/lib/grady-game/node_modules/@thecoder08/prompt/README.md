# Prompt
## What is prompt?
Prompt is an extremely lightweight prompter for the CLI.
## Installation
Run the command
```shell
npm i @thecoder08/prompt
```
to install Prompt.
## Require
Require with this code:
```javascript
var prompt = require('@thecoder08/prompt');
```
## Syntax
```javascript
prompt.once(prompt, callback);
```
Where `prompt` is a string containing the name of the prompt.<br>
Where `callback` is a function with an argument `data`, the prompt data from the CLI.
```javascript
prompt.interface(prompt, callback);
```
Where `prompt` is a string containing the text to output each time the callback is complete.<br>
Where `callback` is a function with an argument `data`, the prompt data from the CLI.
