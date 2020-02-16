# FoodBeGone

## Overview
-Web application that lets restaurant owners upload their food items made by their surplus materials to end-users seeking convenient meals at discounted prices. <br/>
-Web application (mobile friendly) built using TomTom’s Map API

## Inspiration
**Reducing food waste**-<br/> 
Roughly one third of the food produced in the world for human consumption every year — approximately 1.3 billion tonnes — gets lost or wasted according to Food and Agriculture Organization of the United Nations. <br/><br/>
**Restaurant/grocery/bakery demand validation**<br/> 
Most restaurants, grocery and bakery stores are wasting an additional 25% of their net income and adding up to 15% to food cots. <br/>

![peet](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/peets.jpg)
![pizzz](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/pizzaplace.png)

## What it does
### Functionality
-Allows the restaurant to reduce the food waste <br/>
-Allows the end-user to get food from the restaurants for cheaper price <br/>
-Provides basic information such as hours of operation, directions to the shop, and pricing <br/>

### User Story
- [x] User as a supplier can login
- [x] User as a supplier can upload their item template (food menu)
- [x] User as a supplier can upload their last call food using item template with discount rate
- [x] User as a supplier can select the available pickup time
- [ ] User as a supplier can see all the transactions
- [ ] User as a supplier can submit a taxation  information in synced taxation software (turbotax) with a click
- [x] User as a buyer can login
- [x] User as a buyer can see the map and find the restuarnt, grocery stores, cafe, bakery that have last call items on sales 
- [ ] User as a buyer can use filter to show suppliers based on distance, type (restaurant, grocery), percentage of discount, duration to get there (TomTom's Search API, Geocoding API, Routing API)
- [ ] User as a buyer can follow their favorite supplier
- [ ] User as a buyer can get a notification from following supplier once supplier put last call item on sales
- [x] User as a buyer can pick an item that want to purchase and resever it
- [ ] User as a buyer can pay for the purchase in the app
- [x] User as a buyer can see the QRcode generated for confirmation
- [ ] User as a buyer can navigate to the store in the app (Tomtom routing API)
- [ ] User as a buyer can see the number of item left in the item detail view
- [ ] User as a buyer can add commute route to get the notification from suppliers that are near by his/her route range

Version 2 - connector
- [ ] User as a deliverer can pick up the last call food from supplier and deliver to the end user and take delivery fee
- [ ] User as a NPO can pick up the last call food from supplier and donate to the charity/shelter

 

## Demo (Image and video)
**GIF videos**

**Buyer video**
![video](https://user-images.githubusercontent.com/2976514/74612273-b0e19600-50b8-11ea-82d5-12e91c7c933b.gif)

**Supplier video**
![video](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/item%20add.gif)

**Supplier Screenshots**


1.login

![login](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/ws1_login_supplier.png)


2. main

![main](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/ws2_main.png)

3. Adding item Template(menu) 

![Adding item Template(menu)](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/ws3_itemTempl_filled.png)

4. Adding item

![Adding item](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/ws4_item_filled.png)

**Buyer Screenshots**

1. login

![login](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/wb1_login_buyer.png)

2. map

![map](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/wb2_map.png)

3. store

![store](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/wb3_store.png)


4. item

![item](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/wb4_item.png)

5. reserve

![reserve](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/wb5_purchase.png)

6. confirmation

![confirmation](https://github.com/SaswatB/FoodBeGone/blob/master/screenshots/wb6_confirmation.png)


Pick and Reserve Your Food for Pickup!
![FoodBeGone ItemsListAndReserveForm](https://user-images.githubusercontent.com/2976514/74608656-f0e45100-5097-11ea-9fed-31a08c8d103a.gif)


(Devs: db admin info here Issue #6 https://github.com/SaswatB/FoodBeGone/issues/6)

## How we built it
Built with<br/><br/>
**Client-Side**<br/>
-html/css <br/>
-react.js <br/>
-TomTom API (https://developer.tomtom.com/) <br/>
* Map Display API <br/>
   * Cusotom Makrer
* Routing API
  * Reachable region 
  <br/>



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
One of the biggest challenges we faced was integrating frontend with backend adding an external API.

## Accomplishments that we'are proud of
We are pretty proud of having a working product that solves a real-world need and successfully finished a web application. 

## What we learned
Before doing the store visit survey, we thought that restaurants were buying materials to some extent in anticipation of demand. However, through a store visit survey, we found that most restaurants face daily problems that they waste their unsold, surplus foods and these foods end up being thrown away most of the time.

## What's next for FoodBeGone
We can dig deeper into our project and add more features. We can add specific pickup time options and add delivery services in conjunction with delivery api or application to better meet the needs of certain customers. Also, for customers who want to donate, they can create a culture of food donation in connection with the government.

## Team
-Dalia <br/>
-Eric <br/>
-Saswat <br/>
-Simon <br/>
-Shawn





