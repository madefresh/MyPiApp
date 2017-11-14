using System.Web.Mvc;
using Data.Helpers.Interfaces;

namespace MyPiApp.Controllers
{
    public abstract class BaseController : Controller
    {
        protected ILoggerHelper _loggerHelper => this.Resolver.GetService<ILoggerHelper>();
    }
}