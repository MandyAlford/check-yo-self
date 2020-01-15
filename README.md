# Check-Yo-Self

## Description

Check-Yo-Self is a to do list application that allows a user to submit multiple to do lists, each complete with it's own list of tasks. Each to do list can be labeled as urgent, complete with a visual color change that clearly demonstrates urgent stats, tasks can be checked off as they are completed, and lists can be filtered by urgency. Any updates to task status or list urgency remain visible if the user leaves the page and returns. Once a list has all tasks complete, the user can choose to delete the corresponding task card and it will not reappear.

## Technologies Used

Check-Yo-Self was written in HTML, styled in CSS, and all functionality is handled in Javascript. Local storage is utlized via the user's computer, which allows content to persist when the user returns after leaving the page.

## Challenges and Wins

The nature of this app means constantly accessing to do list and task content via local storage. An array of To do list objects are stored, each containing an array of Task objects. Almost every user action causes this data to be iterated over, and the constant looping over data was very mentally taxing at times, but I have walked away from this project with a solid understanding of how to access data in objects and arrays, a concept I previously struggled with. A big win was removing the to do list cards from the DOM rather than hiding them in CSS when filtering by urgency. 

## Examples of the application in use

This is what the website and bear look like when you first load it

