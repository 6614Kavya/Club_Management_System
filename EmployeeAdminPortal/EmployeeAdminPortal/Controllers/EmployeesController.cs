using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly ApplicationDBContext dBContext;

        public EmployeesController(ApplicationDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        [HttpGet]
        public IActionResult getAllEmployees()
        {
            return Ok(dBContext.Employees.ToList());
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult getEmployeeById(Guid id)
        {
            var employee = dBContext.Employees.Find(id);

            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        public IActionResult addEmployee(AddEmployeeDto addEmployeeDto)
        {
            var employeeEntity = new Employee()
            {
                Name = addEmployeeDto.Name,
                Email = addEmployeeDto.Email,
                Phone = addEmployeeDto.Phone,
                Salary = addEmployeeDto.Salary
            };
            dBContext.Employees.Add(employeeEntity);
            dBContext.SaveChanges();

            return Ok(employeeEntity);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public IActionResult updateEmployee(Guid id, UpdateEmployeeDto updateEmployeeDto)
        {
            var employee = dBContext.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            employee.Name = updateEmployeeDto.Name;
            employee.Email = updateEmployeeDto.Email;
            employee.Phone = updateEmployeeDto.Phone;
            employee.Salary = updateEmployeeDto.Salary;

            dBContext.SaveChanges();
            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult deleteEmployee(Guid id)
        {
            var employee = dBContext.Employees.Find(id);
            if (employee == null)
            {
                return NotFound();
            }
            dBContext.Employees.Remove(employee);
            dBContext.SaveChanges();
            return Ok();
        }
    
    }
}
