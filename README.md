# Minecraft Eagler (MCE) Server

Server setup for [Eaglercraft](https://eaglercraft.com/)

fun for lan parties when everybody doesnt have minecraft

<img src="https://static.vecteezy.com/system/resources/thumbnails/012/042/301/small/warning-sign-icon-transparent-background-free-png.png" width="20" /> Please note! This requires manual setup, such as requiring the eaglercraft html file on your own terms.

Works for version: 1.8.8.

# Quick How-To

Download the offline version of Eaglercraft from their website, then rename it to "minecraft". Place this file in `src/frontend`

To start the server run `npm run mce` in the MCE directory.

Share the `ws` ip with friends and connect to the server.


To use the console panel, the machine running the server must connect to `localhost:8006/console`.

To properly turn off the server you can press <CTRL + C> inside the terminal running the server, or by clicking the "Shutdown" button on the console panel.


To reset the world and the loginsecurity, navigate to `src/environment` and remove the `servers` folder. Then unzip the `servers_reset.zip` file. Please make sure that it unzips to a folder called "servers". If not create a folder called "servers" and move `bungee` and `minecraft` into it.


To change the amount of ram (in GiB) of the server, go into the `index.js` file and edit the line `SERVER_RAM_GB` to what ever amount of ram you wish to dedicate.
