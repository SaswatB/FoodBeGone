# FoodBeGone

## Overview
-Web application that allows restaurant owners upload their food items made by their surplus materials to end-users seeking convenient meals at discounted prices. <br/>
-Web application (mobile friendly) built using TomTom’s Map API

## Inspiration
**Reducing food waste**-<br/> 
Roughly one third of the food produced in the world for human consumption every year — approximately 1.3 billion tonnes — gets lost or wasted according to Food and Agriculture Organization of the United Nations. <br/><br/>
**Restaurant/grocery/bakery demand validation**-<br/> 
Most restaurants, grocery and bakery stores are wasting an additional 25% of their net income and adding up to 15% to food cots. <br/>


## What it does
-Allows the restaurant to reduce the food waste <br/>
-Allows the end-user to get food from the restaurants for cheaper price <br/>
-Provides basic information such as hours of operation, directions to the shop, and pricing <br/>


## Demo (Image and video)


Pick and Reserve Your Food for Pickup!
![FoodBeGone ItemsListAndReserveForm](https://user-images.githubusercontent.com/2976514/74608656-f0e45100-5097-11ea-9fed-31a08c8d103a.gif)


(Devs: db admin info here Issue #6 https://github.com/SaswatB/FoodBeGone/issues/6)

## How we built it
Built with<br/><br/>
**Client-Side**<br/>
-html/css <br/>
-react.js <br/>
-TomTom API (https://developer.tomtom.com/) <br/>
-map <br/>
-reachable region <br/>

**Server-Side** <br/>
-Java <br/>
-Springboot <br/>
-mySQL <br/>
-Hibernate

## Installation Instruction


To run the app:

1. Clone the app (https://github.com/SaswatB/FoodBeGone.git)
2. start server 
    * go to 'Githubs/FoodBeGone/backend/FoodBeGone'
    * run command './gradlew bootRun'
2. start client
    * go to 'Githubs/FoodBeGone/frontend'
    * export tomtom's API key 'export REACT_APP_TOM_TOM_API_KEY={yourAPI}'
    * run command 'yarn start'


## Challenges we ran into
One of the biggest challenges we faced was integrating with Google Calendar. Accessing an external API is an asynchronous procedure, and we had to make a clever series of callbacks from the chatbot to fetch and update events in the calendar.

## Accomplishments that we'are proud of

## What we learned
-Before doing the store visit survey, we thought that restaurants were buying materials to some extent in anticipation of demand. However, through a store visit survey, we found that most restaurants face daily problems that they waste their unsold, surplus foods and these foods end up being thrown away most of the time.

## What's next for FoodBeGone
-We can add specific pickup time options and add delivery services in conjunction with delivery api to better meet the needs of certain customers. Also, for customers who want to donate, we can create a culture of food donation in connection with the government.

## Team
-Dalia <br/>
-Eric <br/>
-Saswat <br/>
-Simon <br/>
-Shawn





