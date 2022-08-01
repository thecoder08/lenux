module.exports.getMouse = function(dev, cb) {

require('fs').createReadStream(dev).on('data', function(data) {
    var packet = new Uint8Array(data);
    var x = packet[1] - ((packet[0] << 4) & 0x100);
    var y = packet[2] - ((packet[0] << 3) & 0x100);
    var left = (packet[0] & 0x1) != 0;
    var middle = (packet[0] & 0x4) != 0;
    var right = (packet[0] & 0x2) != 0;
    cb(left, middle, right, x, y);
});

}