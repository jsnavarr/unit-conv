# unit-conv

**unit--conv** was concibed as a challenge from a meetup, it converts from an specific unit to 1 or more units, i.e, kgs to lbs, meters to inches/feet/miles/kilometers, etc.

I decided to use react with the only purpose to learn more about it. I learned that using libraries could make simple things more complicated, because you have to overwrite some behaviour, find ways to extract data from components. 

If I had to chose the stack to build this app then I would just use html/css/javascript, it would be simple but also easy to maintain. I do not regret using react and semantic ui because I learned more about it and it gives you some styling out of the box.

This is a screenshot of the app where you can see the style provided by semantic ui, but I also styled this app with the colors I wanted.
 
![Welcome](https://github.com/jsnavarr/unic-conv/blob/master/public/images/mainscreen.png)



## What It Has/What Was Used:
* React
* Javascript
* HTML/CSS/semantic ui react



## Challenges

* Get data from semantic ui components, I had to use DOM in order to read childs and extract their values.
* Semantic ui components were overlapping when reducing the screen size so I had to set some components (which again, some of them are hidden inside semantic ui components but using chrome web developer console I could make the changes that I wanted). 
* In the past I created a couple of semantic ui react apps, none of then required to import the semantic ui CSS library, I spent a bout 2 hours trying to find out why components were not rendered correctly.

