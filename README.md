# Check-Yo-Self

## Description

Check-Yo-Self is a to do list application that allows a user to submit multiple to do lists, each complete with it's own list of tasks. Each to do list can be labeled as urgent, complete with a visual color change that clearly demonstrates urgent stats, tasks can be checked off as they are completed, and lists can be filtered by urgency. Any updates to task status or list urgency remain visible if the user leaves the page and returns. Once a list has all tasks complete, the user can choose to delete the corresponding task card and it will not reappear.

## Technologies Used

Check-Yo-Self was written in HTML, styled in CSS, and all functionality is handled in Javascript. Local storage is utlized via the user's computer, which allows content to persist when the user returns after leaving the page.

## Challenges and Wins

The nature of this app means constantly accessing to do list and task content via local storage. An array of To do list objects are stored, each containing an array of Task objects. Almost every user action causes this data to be iterated over, and the constant looping over data was very mentally taxing at times, but I have walked away from this project with a solid understanding of how to access data in objects and arrays, a concept I previously struggled with. A big win was removing the to do list cards from the DOM rather than hiding them in CSS when filtering by urgency. 

## Examples of the application in use

This is what the website and bear look like when you first load it:
<img width="1439" alt="Screen Shot 2020-01-14 at 7 58 37 PM" src="https://user-images.githubusercontent.com/54858455/72402237-da02b580-370b-11ea-86f0-8e9d32933a32.png">

<img width="1434" alt="Screen Shot 2020-01-14 at 7 59 19 PM" src="https://user-images.githubusercontent.com/54858455/72402257-e981fe80-370b-11ea-9e08-df6afb01e69d.png">

<img width="1438" alt="Screen Shot 2020-01-14 at 8 04 58 PM" src="https://user-images.githubusercontent.com/54858455/72402284-fc94ce80-370b-11ea-9f05-dfb4b57ab9f3.png">

<img width="1438" alt="Screen Shot 2020-01-14 at 8 05 26 PM" src="https://user-images.githubusercontent.com/54858455/72402294-07e7fa00-370c-11ea-8085-68c976fc6d8c.png">

<img width="1438" alt="Screen Shot 2020-01-14 at 8 05 48 PM" src="https://user-images.githubusercontent.com/54858455/72402221-c1929b00-370b-11ea-8a31-70e3991e6a99.png">
