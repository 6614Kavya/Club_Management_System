using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Services.Booking;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }
        // GET: api/<BookingController>
        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            var result = await _bookingService.GetAllBookings();

            return Ok(result);
        }

        // GET api/<BookingController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBookingById(Guid id)
        {
            var result = await _bookingService.GetBookingById(id);

            return Ok(result);
        }

        [HttpGet("/field/{id}")]
        public async Task<IActionResult> GetBookingByFieldId(Guid id)
        {
            var result = await _bookingService.GetBookingByFieldId(id);

            return Ok(result);
        }

        // POST api/<BookingController>
        [HttpPost]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingDto createBookingDto)
        {
            try
            {
                var result = await _bookingService.CreateBooking(createBookingDto);

                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // PUT api/<BookingController>/5
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateBooking(Guid id, [FromBody] CreateBookingDto createBookingDto)
        {
            var result = await _bookingService.UpdateBooking(id, createBookingDto);

            return Ok(result);
        }

        // DELETE api/<BookingController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(Guid id)
        {
            var result = await _bookingService.DeleteBookingById(id);

            return Ok(result);
        }

        [HttpPatch("{bookingId}/status")]
        public async Task<IActionResult> UpdateBookingStatus(Guid bookingId, [FromBody] string newStatus)
        {
            var validStatuses = new[] { "Pending", "Accepted", "Rejected", "Cancelled" };
            if (!validStatuses.Contains(newStatus))
                return BadRequest("Invalid status.");

            var success = await _bookingService.UpdateBookingStatus(bookingId, newStatus);
            if (!success)
                return NotFound("Booking not found.");

            return Ok(new { message = "Status updated." });
        }

        [HttpGet("/status")]
        public async Task<IActionResult> GetBookingsByStatus(string status)
        {
            var result = await _bookingService.GetBookingByStatusAsync(status);

            return Ok(result);
        }
    }
}
