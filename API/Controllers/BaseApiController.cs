using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController] //permet de binder automatiquement les dto dans le controller +  gere la validation des models ou dtos
    [Route("api/[controller]")]

    public class BaseApiController : ControllerBase
    {
        
    }
}