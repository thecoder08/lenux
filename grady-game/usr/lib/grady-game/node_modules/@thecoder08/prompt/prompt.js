var input = process.stdin;
var output = process.stdout;
module.exports = {
  'once': function(prompt, callback) {
    output.write(prompt);
    input.once('data', function(data) {
      callback(data);
    });
  },
  'interface': function(prompt, callback) {
    output.write(prompt);
    input.on('data', function(data) {
      callback(data);
      output.write(prompt);
    });
  }
}
