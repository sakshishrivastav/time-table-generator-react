Solution: @ [Live](https://sakshishrivastav.github.io/time-table-generator-react/).


Task: Dynamic Time-Table Generator


Description: Implement an app which take some input from user and generate a dynamic Time-table


Fields that will be enter by the user


1. No of Working days: Accepts only +ve number between 1 to 8
2. No of working hours per day: Accepts only +ve number less than 10
3. Total Subjects: Accepts only +ve number
4. No of subjects per day: Accepts only +ve number


From above input the system will generate total hours of week


eqation: Total hours for week = No of Working days *  No of working hours per day


Total hours should auto-genrate on enter values. Once total hours genrated allow user to submit the data.


on submission the system will generate a new form to get total hours of each subject for total working days.


For example Total Subjects is 4 so, form will look like below


Gujarati            5
-----------------   -------------
English             5
-----------------   -------------
Science             10
-----------------   -------------
Maths               10
-----------------   -------------


The total hours of subject must be equal to 'Total hours for week'.


after entering all subject's hours system enables "Generate" button. On click Generate button it will create a time-table from above entered information


Total Columns = No of Working days
Total Rows = No of subjects per day


place the above subjects dynamically in the table as per the entered hours of each subject.