function createEmployeeRecord(employee) {
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employees) {
  return employees.map((employee) => createEmployeeRecord(employee))
}

function createTimeInEvent(employeeRecordObj, timeStamp) {
  employeeRecordObj.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0]
  })
  return employeeRecordObj
}

function createTimeOutEvent(employeeRecordObj, timeStamp) {
  employeeRecordObj.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(timeStamp.split(" ")[1]),
    date: timeStamp.split(" ")[0]
  })
  return employeeRecordObj
}

function hoursWorkedOnDate(employeeRecordObj, date) {
  const inHour = employeeRecordObj.timeInEvents.find(timeStamp => timeStamp.date === date).hour / 100
  const outHour = employeeRecordObj.timeOutEvents.find(timeStamp => timeStamp.date === date).hour / 100
  return outHour - inHour
}

function wagesEarnedOnDate(employeeRecordObj, date) {
  return hoursWorkedOnDate(employeeRecordObj, date) * employeeRecordObj.payPerHour
}

function allWagesFor(employeeRecordObj) {
  return employeeRecordObj.timeInEvents.reduce((totalPay, timeIn) => {
    return wagesEarnedOnDate(employeeRecordObj, timeIn.date) + totalPay
  }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName)
}

function calculatePayroll(srcArray) {
  return srcArray.reduce((totalPay, employee) => {
    return allWagesFor(employee) + totalPay
  }, 0)
}