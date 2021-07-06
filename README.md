# Overview
This solution implements the following exercise directly in the browser, using only HTML and Vanilla JavaScript.

## Exercise
The company ACME offers their employees the flexibility to work the hours they want. They will pay for the hours worked based on the day of the week and time of day, according to the following table:
* Monday - Friday
  * 00:01 - 09:00 25 USD
  * 09:01 - 18:00 15 USD
  * 18:01 - 00:00 20 USD
* Saturday and Sunday
  * 00:01 - 09:00 30 USD
  * 09:01 - 18:00 20 USD
  * 18:01 - 00:00 25 USD

The goal of this exercise is to calculate the total that the company has to pay an employee, based on the hours they worked and the times during which they worked. The following abbreviations will be used for entering data:
* MO: Monday
* TU: Tuesday
* WE: Wednesday
* TH: Thursday
* FR: Friday
* SA: Saturday
* SU: Sunday

**Input:** the name of an employee and the schedule they worked, indicating the time and hours. This should be a .txt file with at least five sets of data. You can include the data from our two examples below.

**Output:** indicate how much the employee has to be paid

*For example:*

* *Case 1:*
  * INPUT
    * RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00
  * OUTPUT
    * The amount to pay RENE is: 215 USD

* *Case 2:*
  * INPUT
    * ASTRID=MO10:00-12:00,TH12:00-14:00,SU20:00-21:00
  * OUTPUT
    * The amount to pay ASTRID is: 85 USD

# Architecture
The solution has two phases: 
1. In the first one, the data inside the file is validated to follow the right types, lengths, formats, limits and constraints.

1. The second phase is for calculate the amount based in the day of the week and the time. 

Each phase is implemented into a JavaScript function inside ./js/solution.js file:

* *Phase 1: getAmountByText*
  * Parameter: text to be analyzed.
  
  * Output: structure with the following form: {name, amount, error}

* *Phase 2: getPayByTime*
  * Parameters:
    * dayOfWeek: the day code, a text with lenght of two characters. 
    * startMinutes: The number of minutes since midnight that the person start working. 
    * endMinutes: The number of minutes since midnight that the person stop working.

  * Output: Amount to be paid for the time worked in a specific day.

# Approach and methodology
The solution uses web technologies because it is easier and safer to run on any computer. The approach was firstly to validate the file data, and then to calculate the amount.  

For testing, Jest-lite is used directly in the browser. There are three testing groups implemented in ./js/tests.js file:

1. **Example**: Uses the sample data given with the exercise.
1. **Data format**: Tests the main variants of data format mistakes.
1. **Pays**: Tests the pay a employee reveices.

# How to run the program locally
1. Download or clome the git project locally.
1. Open the index.html file with a browser.
1. That's all, you are ready to load your .txt file! There are two files already created inside the GitHub project if you want to use them for testing.  
