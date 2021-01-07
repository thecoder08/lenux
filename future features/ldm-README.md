# LDM documentation
## Command line
The usage for the `ldm` command is as follows:
```shell
ldm [config] [log]
```
Where `[log]` is the path to a plain text log file.  
Where `[config]` is the path to a JSON configuration file.

If `ldm` is run without any arguments, then the default log file is assumed. It is `ldm.log`. Also, the default config is assumed. It is as follows:
```json
{
  "tty": 7,
  "xdisplay": ":0",
  "vnc": true,
  "vncdisplay": ":1",
  "vncport": 5900
}
```
## Configuration
The configuration options are as follows:

`tty`: The terminal that the X server runs on (if applicable).  
`xdisplay`: The `DISPLAY` variable that X clients use to connect to the X server.  
`vnc`: dictates weather the VNC server will be started.  
`vncdisplay`: The `DISPLAY` variable that X clients use to connect to the VNC server.  
`vncport`: The TCP/IP port that VNC clients use to connect to the VNC server.

## Prerequisites
The below prerequisites should only have to be fulfilled if you are using LDM on a system other that lenux. It has been tested on Debian 10.
- The X server should be symlinked to the command `X`, and should be in the `PATH`.
- The VNC server should be symlinked to the command `Xvnc`, and should be in the `PATH`.
