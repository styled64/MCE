# Minecraft Eagler (MCE) Server

(for experienced users)

Server setup for [Eaglercraft](https://eaglercraft.com/)

fun for lan parties when everybody doesnt have minecraft

<img src="https://static.vecteezy.com/system/resources/thumbnails/012/042/301/small/warning-sign-icon-transparent-background-free-png.png" width="20" /> Please note! This requires manual setup, such as requiring the eaglercraft html file on your own terms.

Works for version: 1.8.8.

# How-To

Download the offline version of Eaglercraft from their website, unzip the zip file and find the EaglercraftX html file, rename it to "minecraft.html", then place it inside `src/frontend`.

In the MCE directory...

Run `npm install` to install the packages required to run.

To start the server run `npm run mce` or `node index.js` in the MCE directory.

Open ports `8006` and `8081` (TCP & UDP) to your local network. On linux, use `iptables` or `ufw`. On windows use the Windows Firewall to open the ports. Then share your `ws` ip with your friends. If you plan to play over internet, open the ports on your router.

To use the console panel, the machine running the server must connect to `localhost:8006/console`.

To properly turn off the server you can press <CTRL + C> inside the terminal running the server, or by clicking the "Shutdown" button on the console panel.


To reset the world and the loginsecurity, navigate to `src/environment` and remove the `servers` folder. Then unzip the `servers_reset.zip` file. Please make sure that it unzips to a folder called "servers". If not create a folder called "servers" and move `bungee` and `minecraft` into it.


To change the amount of ram (in GiB) of the server, go into the `index.js` file and edit the line `SERVER_RAM_GB` to what ever amount of ram you wish to dedicate.
