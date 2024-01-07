// This helper uses the due date defined by the user and transforms it to a friendlier view on their todo list.
// Function to calculate the difference in days between two dates
function getDaysDifference(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
   
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
   }
   
   // Function to calculate the difference in weeks between two dates
   function getWeeksDifference(date1, date2) {
    const daysDifference = getDaysDifference(date1, date2);
    const weeksDifference = Math.ceil(daysDifference / 7);
    return weeksDifference;
   }
   
   // Function to transform MM/DD/YYYY date format into a JavaScript Date object
   function transformToDateObject(dateString) {
    const [month, day, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
   }
   
   // Function to get the remaining days or weeks until a given due date
   function getRemainingTimeUntilDueDate(dueDate) {
    const currentDate = new Date();
    const dueDateObject = transformToDateObject(dueDate);
   
    const daysRemaining = getDaysDifference(currentDate, dueDateObject);
    const weeksRemaining = getWeeksDifference(currentDate, dueDateObject);
   
    return { daysRemaining, weeksRemaining };
   }
   
   module.exports = { getRemainingTimeUntilDueDate };
   
   // Below code should be added in order to use the duedate helpers app.
   
   // const helpers = require('./helpers');
   
   // const dueDate = '12/31/2023';
   // const { daysRemaining, weeksRemaining } = helpers.getRemainingTimeUntilDueDate(dueDate);
   
   // console.log(`Days remaining until due date: ${daysRemaining}`);
   // console.log(`Weeks remaining until due date: ${weeksRemaining}`);