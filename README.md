##Documentation

Project Charter:
https://docs.google.com/document/d/1IzQ16nEapbb6hWlmcd3pnbgY3Vw2xoC5zgrRWSjko0w/edit?usp=sharing

Product Backlog:
https://docs.google.com/document/d/1LmpWnN3Y2PnlxpdSENFo36AS9bYgDgN_tCghwwCwI7I/edit?usp=sharing

Design Document:
https://docs.google.com/document/d/1ug03YnUfyz7OtRr3f5z1_tXUdLSVWBzV6Gcxj_G6nC8/edit?usp=sharing

Sprint 1 Planning Document:
https://docs.google.com/document/d/1SOm9PcUpoeSvkf-b_olzy1sWQsDJLYlf91y59SIfjnk/edit?usp=sharing

## Setup: Grunt
[Grunt](http://gruntjs.com/) is a javascript task runner, you can use it to do things like minification, compilation, unit testing, linting, etc, but we're only using it to compile sass into css right now.

Install grunt and the command line interface globally on your computer and install the dev dependencies (run these from the LoungeWeb directory)
```
npm install -g grunt
npm install -g grunt-cli
npm install
```

In a new terminal window (from the LoungeWeb directory) run grunt watch and keep it running. It will listen for whenever a change has been made to the .scss files and compile them into application.css
```
grunt watch
```
