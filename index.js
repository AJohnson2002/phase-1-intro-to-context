let employeeTest
function createEmployeeRecord(employee){
    employeeTest = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employeeTest
}

function createEmployeeRecords(employees) {
  return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(' ')
  employee.timeInEvents.push({
     type: 'TimeIn',
     date: date,
     hour: parseInt(hour)
    })
  return employee
}
createTimeInEvent(testEmployee, "2023-08-27 1730")

function createTimeOutEvent(employee, dateTime) {
  const [date, hour] = dateTime.split(' ')
  employee.timeOutEvents.push({
    type: 'TimeOut',
    date: date,
    hour: parseInt(hour)
  })
  return employee
}
createTimeOutEvent(testEmployee, "2023-08-27 1900")

function hoursWorkedOnDate(employee, date) {
  const timeIn = employee.timeInEvents.find(event => event.date === date)
  const timeOut = employee.timeOutEvents.find(event => event.date === date)
  return (timeOut.hour - timeIn.hour)/100
}
hoursWorkedOnDate(testEmployee, "2023-08-27")

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}
wagesEarnedOnDate(testEmployee, "2023-08-27")

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => total + wagesEarnedOnDate(employee, event.date), 0)
}
allWagesFor(testEmployee)

function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee),0)
}