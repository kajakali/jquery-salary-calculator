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
        employees.push(newEmployeeObjectForArray);
        putPeopleOnDom();
    function putPeopleOnDom(){
        // put the people from employees array into the table (before #tableBottom)
        console.log("show the people in the table");
        for(person of employees){
            console.log(person.firstName);
        }
    }  
   
    }
    
    // create a delete button in each delete button space in the table?
    //know to delete people on click of .deleteButton (class of buttons...no, it'll have to be on table click
        //$('#employeeTable').on('click', /*grandchildren? */ deletePerson);
        //function deletePerson(){
            //console.log('delete person');

        //}
    //and then find the delete buttons that are children of the table...)

    
    


}




