using System.ComponentModel.DataAnnotations;

namespace EmployeeAdminPortal.Models
{
    public class UpdatePasswordDto
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [MinLength(6)]
        public string NewPassword { get; set; }
    }
}
