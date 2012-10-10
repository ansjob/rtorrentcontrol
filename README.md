# rTorrent Web Control

rTorrent Web Control is an HTML5-based web application to control your rtorrent instance in real time.
[![Build Status](https://secure.travis-ci.org/ansjob/rtorrentcontrol.png?branch=master)](http://travis-ci.org/ansjob/rtorrentcontrol)

#Cancelled

This project is put on hold for know, since I decided to use the web interface available
in Transmission for now. Maybe if I become unemployed or have large amounts of extra time on
my hands, I'll pick this project up again.

## Purpose

The purpose of this software is mainly for me to get accustomed to writing javascript applications,
but maybe someone out there besides myself will find it useful.

## How does it work?

You need to run the server in a Java Servlet container (like Tomcat, Jetty or Glassfish),
and then access it with your browser. The servlet will then make requests to rTorrent through
the XMLRPC interface. This means that rTorrent has to be compiled with the ```--with-xmlrpc``` flag
for this to work. Guides can be found on the rtorrent project page.

## Future

It is very possible to extend this to other bittorrent clients.
