document.addEventListener("DOMContentLoaded", () => {
  const employeeList = document.getElementById('list');
  const addEmployeeForm = document.getElementById('add-employee-form');

  function fetchEmployees() {
      fetch('https://dummyjson.com/users')
          .then(response => response.json())
          .then(data => {
              employeeList.innerHTML = '';
              data.users.forEach(employee => {
                  const li = document.createElement('li');
                  li.textContent = `${employee.firstName} ${employee.lastName}`;
                  employeeList.appendChild(li);
              });
          })
          .catch(error => console.error('Error fetching employees:', error));
  }

  addEmployeeForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const formData = new FormData(addEmployeeForm);
      const newEmployee = {
          firstName: formData.get('name').split(' ')[0],
          lastName: formData.get('name').split(' ')[1],
          age: formData.get('age'),
          email: formData.get('email')
      };

      fetch('https://dummyjson.com/users/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newEmployee)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Employee added:', data);
          addEmployeeForm.reset();
          fetchEmployees(); 
      })
      .catch(error => console.error('Error adding employee:', error));
  });

  fetchEmployees();
});
