// Your code here
function createEmployeeRecord (employeeArray) {
    const records = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return records;
}
function createEmployeeRecords (employeeArray) {
    const records = employeeArray.map(data =>createEmployeeRecord(data))
    return records;
}
function createTimeInEvent (employeeRecord, dateStamp) {
    // const date = new Date();
    // const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    // const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour,10),
        date,
    })
    return employeeRecord;
}
function createTimeOutEvent (employeeRecord, dateStamp){
    // const date = new Date();
    // const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    // const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const [date, hour] = dateStamp.split(" ")
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour,10),
        date,
    })
    return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, specificDate) {
  let timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.date === specificDate
  );
  let timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.date === specificDate
  );
  let totalTimeWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
  return totalTimeWorked;
}
function wagesEarnedOnDate (employeeRecord, specificDate) {
    return parseFloat(hoursWorkedOnDate(employeeRecord, specificDate) * employeeRecord.payPerHour.toString());
}
function allWagesFor(employeeRecord) {
    let payDates = employeeRecord.timeInEvents.map(e=>e.date)
    let payOwedAllDates = payDates.reduce((allInfo, dates) =>{
        return allInfo + wagesEarnedOnDate(employeeRecord, dates)
    }, 0)
    return payOwedAllDates;
}
function calculatePayroll (employeeRecord) {
    let empRecords = employeeRecord.reduce((allInfo, datesRecords)=>{
        return allInfo + allWagesFor(datesRecords);
    }, 0)
    return empRecords;
}
