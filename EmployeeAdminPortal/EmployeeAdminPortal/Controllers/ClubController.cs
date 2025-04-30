using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Controllers
{
    public class ClubController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
