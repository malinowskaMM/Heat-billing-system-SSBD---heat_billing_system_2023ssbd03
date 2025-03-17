# Heat Billing System

This project was developed as a part of the "Network Database Systems" course. The main objective of the project was to create a heat billing system for multiple buildings.

## Description

The Heat Billing System is designed to efficiently calculate heat consumption in various apartments within multiple buildings.
![alt text](https://github.com/malinowskaMM/Heat-billing-system-SSBD---UML-diagrams/blob/master/src/main/resources/view/mainPage.png)

## Technologies Used

- **Frontend:** React, TypeScript, React i18n, MaterialUI
- **Backend:** Jakarta EE 10, Hibernate, JUnit, Testcontainers, RestAssured
- **Database:** PostgreSQL 15
- **Development Environment:** Payara 6, Docker, Nginx, PostgreSQL

## Participants of project

- Hubert Królikowski
- Jakub Kucharski
- Magdalena Malinowska
- Bartosz Miszczak
- Radosław Moskal
- Bartosz Zuchora

# Use case diagrams generated using PlantUML (Heat-billing-system-SSBD--UML-diagrams repository)
## Functional Modules

### Table 1.1. List of Functional Modules

| Acronym | Full Name                    |
|---------|------------------------------|
| MOK     | Account Management Module    |
| MOW     | Node Management Module       |

## Access Levels (Actors)

### Table 1.2. Actors and their roles in the business model

| Actor          | Definition                                                                 |
|----------------|---------------------------------------------------------------------------|
| Guest          | Unauthenticated actor (anonymous).                                        |
| Owner          | Authenticated actor who enters hot water meter readings from their units. |
| Manager        | Authenticated actor who manages the node and buildings.                   |
| Admin          | Authenticated actor who manages users.                                    |
| System         | Actor performing actions not initiated by a user.                         |

### Table 1.3. Sequences for creating a functional account with a given access level

| Actor          | Sequence                                                                                       |
|----------------|------------------------------------------------------------------------------------------------|
| Guest          | Unauthenticated account                                                                        |
| Owner          | Registration → Email confirmation → Unit assignment by Manager                                 |
| Manager        | Registration → Email confirmation → Manager rights assignment by Admin                         |
| Admin          | Registration → Email confirmation → Admin rights assignment by Admin                           |
| System         | Actor performing actions not initiated by a user                                                |


## MOK 
![alt text](https://github.com/malinowskaMM/Heat-billing-system-SSBD---UML-diagrams/blob/master/src/main/resources/MOK/MOKAdmin.png?raw=true)
![alt text](https://github.com/malinowskaMM/Heat-billing-system-SSBD---UML-diagrams/blob/master/src/main/resources/MOK/MOKWlasciciel.svg?raw=true)
![alt text](https://github.com/malinowskaMM/Heat-billing-system-SSBD---UML-diagrams/blob/master/src/main/resources/MOK/MOKGosc.png?raw=true)
![alt text](https://github.com/malinowskaMM/Heat-billing-system-SSBD---UML-diagrams/blob/master/src/main/resources/MOK/MOKZarzadca.svg)

## MOW
![alt text](https://github.com/malinowskaMM/Heat-billing-system-SSBD---UML-diagrams/blob/master/src/main/resources/MOW/diagramPrzypadkowUzyciaMOWGosc.png?raw=true)
![alt text](https://github.com/malinowskaMM/Heat-billing-system-SSBD---UML-diagrams/blob/master/src/main/resources/MOW/diagramPrzypadkowUzyciaMOWWlasciciel.png?raw=true)
![alt text](https://github.com/malinowskaMM/Heat-billing-system-SSBD---UML-diagrams/blob/master/src/main/resources/MOW/diagramPrzypadkowUzyciaMOWYSystem.png?raw=true)
![alt text](https://github.com/malinowskaMM/Heat-billing-system-SSBD---UML-diagrams/blob/master/src/main/resources/MOW/diagramPrzypadkowUzyciaMOWZarzadca.png)
