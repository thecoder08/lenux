#!/usr/bin/node
import { SerialPort } from 'serialport';
if (process.stdin.isTTY) {
    var serial = await prompt('Enter modem serial port: ');
    console.log(serial);
    var baud = parseInt(await prompt('Enter baud rate: '));
    console.log(baud);
    var action = await prompt('Would you like to answer or dial? (Type A or D): ');
    console.log(action);
    if (action == 'D') {
        var number = await prompt('Enter phone number: ');
        var modem = new SerialPort({path: serial, baudRate: baud});
        modem.write('ATZ\r');
        modem.write('ATD' + number + '\r');
        console.log('Connecting...');
        process.stdin.once('data', async function(data) {
            if (data.toString().includes('CONNECT ')) {
                console.log('Connected.');
                process.stdin.setRawMode(true);
                modem.pipe(process.stdout);
                process.stdin.pipe(modem);
                await waitfor('NO CARRIER\r\n');
                console.log('Other party disconnected.');
            }
            else if (data.toString() == 'NO CARRIER') {
                console.log('Could not connect.');
            }
        });
    }
    else if (action == 'A') {
        console.log('Waiting for call...');
        await waitfor('RING\r\n');
        modem.write('ATA\r');
        console.log('Connecting...');
        process.stdin.once('data', async function(data) {
            if (data.toString().includes('CONNECT ')) {
                console.log('Connected.');
                process.stdin.setRawMode(true);
                modem.pipe(process.stdout);
                process.stdin.pipe(modem);
                await waitfor('NO CARRIER\r\n');
                console.log('Other party disconnected.');
            }
            else if (data.toString() == 'NO CARRIER') {
                console.log('Could not connect.');
            }
        });
        console.log('Connected.');
        process.stdin.setRawMode(true);
        modem.pipe(process.stdout);
        process.stdin.pipe(modem);
        await waitfor('NO CARRIER\r\n');
        console.log('Other party disconnected.');
    }
    else {
        console.log('Enter A or D.');
        process.exit();
    }
}
else {
    console.log('modem must be run in a TTY.');
}

function prompt(string) {
process.stdout.write(string);
return new Promise(function(resolve, reject) {
    process.stdin.once('data', function(data) {
        resolve(data.toString().split('\n')[0]);
    });
});
}

function waitfor(string) {
    return new Promise(function(resolve, reject) {
        modem.on('data', function(data) {
            if (data.toString() == string) {
                resolve();
            }
        });
    });
}