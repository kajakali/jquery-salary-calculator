$(document).ready(onReady);

const currency = new Intl.NumberFormat(
    'en-US',
    {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }
)
let employees = [];

// testing information. Delete this for actual use.
let employee1 = {
    firstName:'Jen',
    lastName:'Barber',
    id:4521,
    title:'Team Lead',
    salary:80000
};
let employee2 = {
    firstName:'Maurice',
    lastName:'Moss',
    id:8742,
    title:'Support Team',
    salary:58000
};

let employee3 = {
    firstName:'Roy',
    lastName:'Smith',
    id:9623,
    title:'Quality Assurance',
    salary:48000
};
console.log(employees);
employees.push(employee1);
employees.push(employee2);
employees.push(employee3);
console.log(employees);
// end testing information

function onReady(){
    console.log('JQ');
    // know to push a person to the array on click of #submitButton (a person should include a delete button)
    $('#submitButton').on('click', peopleIntoEmployees);
    //know to delete people on click of .deleteButton (class of buttons...no, it'll have to be on table click
    $('#employeeTable').on('click', '.deleteButton', deletePerson); 
} //end on ready

function deletePerson( event ){
    console.log('delete person');
    let deletedPerson = $(this).parent().parent().text();
    //figure out which person we're deleting
    let pattern = deletedPerson.match(/(\d+)/m);
    if(pattern){
        let employeeID = pattern[0]; // this is the id of the person (if no numbers in names, and ID is 4 digits)
        console.log(employeeID);
        // take the employee out of the employee array
        for (let i = 0; i < employees.length; i++){
            if(employees[i].id == employeeID){
                console.log ('found the employee to erase!');
                //take the employee out of the employees array
                employees.splice(i, 1);
                console.log(employees);
            }
        monthlyCostCalculator();
        }
            
        
    }
    $(this).parent().parent().remove();
    //we have to erase the person from the array, too...(this would fix the monthly cost calc)
    monthlyCostCalculator();
}// end delete person

function peopleIntoEmployees(){
    console.log(`put person into employees array`);
    // get rid of any error messages that got made last time through...
    $('#error').remove();
    //input validation:  All five inputs must exist
    if(
        (!$('#firstNameIn').val() || !$('#lastNameIn').val() || !$('#idIn').val() || !$('#titleIn').val() || !$('#salaryIn').val())
    ){
        console.log('missing input');
        //here's where to tell the user about the missing input. before submit button put html
        $('#submitButton').before('<p class=warning id=error>You are missing an input.</p>');
        return false;
    }
    // input validation first name, last name may not contain numbers.
    if(!($('#firstNameIn').val().match(/^[^0-9]+$/g)) || !($('#lastNameIn').val().match(/^[^0-9]+$/g))){
        console.log('name contains numbers');
        //heres where to tell the user about numbers in the names
        $('#submitButton').before('<p class=warning id=error>Employee Names may not contain numbers.</p>');
        return false;
    }
    //ID must be 4 digits.
    if(!($('#idIn').val().match(/^\d{4}$/))){
        console.log('ID number must be 4 digits');
        //here's where to tell the user about the ID problem
        $('#submitButton').before('<p class=warning id=error>ID number must be 4 digits long.</p>');
        return false;
    }
    //ID can't be the same as another employee
    for (element of employees){
        if(element.id == $('#idIn').val()){
            console.log('ID already in use!');
            //here's where to tell the user about the ID problem
            $('#submitButton').before('<p class=warning id=error>That ID number is already in use.</p>');
            return false;
        }
    }
    //take inputs and create an object
    const newEmployeeObjectForArray = {
        firstName:$('#firstNameIn').val(),
        lastName:$('#lastNameIn').val(),
        id:Number($('#idIn').val()),
        title:$('#titleIn').val(),
        salary:Number($('#salaryIn').val()),
    };
    //clear the inputs
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#idIn').val('');
    $('#titleIn').val('');
    $('#salaryIn').val('');
    //put new employee in the employee array
    employees.push(newEmployeeObjectForArray);
    putPeopleOnDom();
    function putPeopleOnDom(){
        // put the people from employees array into the table (including delete buttons)
      console.log("show the people in the table");
       //remove the stuff from the table
       $('#employeeTable').empty();
            //add table header to table    
       $('#employeeTable').append(
            `<tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th title="identity number">ID</th>
                <th>Title</th>
                <th>Annual Salary</th>
                <th></th>
            </tr>`);
        for(person of employees){
            console.log(person.firstName);

        //add the employees array to the table
        //probably should format the salary...

            $('#employeeTable').append( //formatting the salary here with js
                `<tr>
                    <td>${toTitleCase(person.firstName)}</td>
                    <td>${toTitleCase(person.lastName)}</td>
                    <td>${person.id}</td>
                    <td>${toTitleCase(person.title)}</td>
                    <td>${currency.format(person.salary)}</td> 
                    <td><button class="deleteButton">Delete</button></td>
                </tr>`);
        //add back the table bottom to the table??
        } //end for loop to put people on DOM
        
        // put monthly costs on DOM here.
        monthlyCostCalculator();
       
    }  //end putting people on DOM
} //end putting people into Employees array

function monthlyCostCalculator(){
    $('#monthlyCost').empty();
    let monthlyPrice = 0;
    for (let item of employees){
        monthlyPrice += (item.salary/12);
    }
    monthlyPriceFormatted = currency.format(monthlyPrice);
    $('#monthlyCost').append(monthlyPriceFormatted);
    if(monthlyPrice > 20000){
        $('#monthlyCost').addClass("red");
        //add a red class to the span with id #monthlyCost
    }
    else{
        $('#monthlyCost').removeClass("red");
        //remove any red classes from the span with id #monthlyCost doesn't work yet.
    }
} //end monthly cost calculator

function toTitleCase(string){
    return string.replace(
        /([^\W_]+[^\s-]*) */g, 
        function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    )
} // end to tile case


