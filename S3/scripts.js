"use strict";

/*====================================================
    Employee Management Application
    Author : SG
    Description:
    Handles Create and Read operations
    using AWS API Gateway + Lambda + DynamoDB
=====================================================*/

//======================
// API Configuration
//======================
const API_ENDPOINT =
  "https://r96cg6x4f3.execute-api.ap-south-1.amazonaws.com/az";

//======================
// DOM Elements
//======================
const saveBtn = document.getElementById("saveemployee");
const getBtn = document.getElementById("getemployees");
const statusMessage = document.getElementById("EmployeeSaved");
const employeeTable = document.getElementById("EmployeeTable");

//======================
// Event Listeners
//======================
saveBtn.addEventListener("click", saveEmployee);
getBtn.addEventListener("click", getEmployees);

//======================================================
// Save Employee
//======================================================
function saveEmployee() {

    const employeeData = {
        employeeid: $("#employeeid").val().trim(),
        name: $("#name").val().trim(),
        department: $("#department").val().trim(),
        salary: $("#salary").val().trim()
    };

    // Input Validation
    if (
        !employeeData.employeeid ||
        !employeeData.name ||
        !employeeData.department ||
        !employeeData.salary
    ) {
        showStatus("⚠ Please fill all fields.", "red");
        return;
    }

    saveBtn.disabled = true;
    showStatus("Saving Employee...", "#0d6efd");

    $.ajax({
        url: API_ENDPOINT,
        type: "POST",
        data: JSON.stringify(employeeData),
        contentType: "application/json",
        dataType: "json",

        success: function (response) {

            console.log("Employee Saved Successfully", response);

            showStatus("✅ Employee Saved Successfully!", "green");

            clearForm();

        },

        error: function (xhr, status, error) {

            console.error("Save Error");

            console.error("Status :", status);
            console.error("Error  :", error);
            console.error(xhr);

            showStatus("❌ Failed to Save Employee.", "red");
        },

        complete: function () {
            saveBtn.disabled = false;
        }
    });

}

//======================================================
// Get Employees
//======================================================
function getEmployees() {

    getBtn.disabled = true;

    $.ajax({

        url: API_ENDPOINT,

        type: "GET",

        contentType: "application/json",

        success: function (response) {

            console.log("Employee List");

            console.table(response);

            // Remove previous rows except header
            $("#EmployeeTable tr").slice(1).remove();

            if (response.length === 0) {

                employeeTable.insertAdjacentHTML(
                    "beforeend",
                    `<tr>
                        <td colspan="4" style="text-align:center;">
                            No Employee Records Found
                        </td>
                    </tr>`
                );

                return;
            }

            response.forEach(employee => {

                employeeTable.insertAdjacentHTML(
                    "beforeend",

                    `
                    <tr>
                        <td>${employee.employeeid}</td>
                        <td>${employee.name}</td>
                        <td>${employee.department}</td>
                        <td>${employee.salary}</td>
                    </tr>
                    `
                );

            });

        },

        error: function (xhr, status, error) {

            console.error("GET Error");

            console.error(status);
            console.error(error);
            console.error(xhr);

            alert("Unable to fetch Employee Records.");

        },

        complete: function () {

            getBtn.disabled = false;

        }

    });

}

//======================================================
// Utility Functions
//======================================================

// Display Status Message
function showStatus(message, color) {

    statusMessage.innerHTML = message;
    statusMessage.style.color = color;
}

// Clear Input Fields
function clearForm() {

    $("#employeeid").val("");
    $("#name").val("");
    $("#department").val("");
    $("#salary").val("");

}