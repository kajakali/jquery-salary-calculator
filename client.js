$(document).ready(onReady);

let employees = [];
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




function onReady(){
    console.log('JQ');
    // know to push a person to the array on click of #submitButton (a person should include a delete button?)
    $('#submitButton').on('click', peopleIntoEmployees);
    function peopleIntoEmployees(){
        console.log(`put person into employees array`);
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
                    <th>ID</th>
                    <th>Title</th>
                    <th>Annual Salary</th>
                    <th></th>
                </tr>`);
            for(person of employees){
                console.log(person.firstName);

            //add the employees array to the table
            //probably should format the salary...

                $('#employeeTable').append( //consider formatting the salary here with js
                    `<tr>
                        <td>${person.firstName}</td>
                        <td>${person.lastName}</td>
                        <td>${person.id}</td>
                        <td>${person.title}</td>
                        <td>$${person.salary}</td> 
                        <td><button class="deleteButton">Delete</button></td>
                    </tr>`);
            //add back the table bottom to the table??
            } //end for loop to put people on DOM
              // put monthly costs on DOM here.

            monthlyCostCalculator();
           
        }  //end putting people on DOM
    }//end putting people into Employees array
    
  
    //know to delete people on click of .deleteButton (class of buttons...no, it'll have to be on table click
        $('#employeeTable').on('click', '.deleteButton', deletePerson); 
        function deletePerson( event ){
            console.log('delete person');
            console.log($(this).parent().parent().text());
            $(this).parent().parent().remove();
            //we have to erase the person from the array, too...(this would fix the monthly cost calc)
            monthlyCostCalculator();
            }
        // reiterate monthly costs calculator?    
   

    // when i delete a person, their cost doesn't come out of the monthly cost array...

    


}

function monthlyCostCalculator(){
    $('#monthlyCost').empty();
    let monthlyPrice = 0;
    for (let item of employees){
        monthlyPrice += (item.salary/12);
    }
    $('#monthlyCost').append(monthlyPrice);
    if(monthlyPrice > 20000){
        $('#monthlyCost').addClass("red");
        //add a red class to the span with id #monthlyCost
    }
    else{
        $('#monthlyCost').removeClass("red");
        //remove any red classes from the span with id #monthlyCost doesn't work yet.
    }
} 


