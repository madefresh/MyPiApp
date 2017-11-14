using System.Collections.Generic;
using System.Web.Mvc;
using Data.Entities;
using MyPiApp.Models;

namespace MyPiApp.Controllers
{
    public class HomeController : BaseController
    {

        public HomeController() 
        {
            
        }


        public ActionResult Index()
        {
            var viewModel = new HomeViewModel
            {
                CryptosViewModel =
                {
                    Cryptos = TestCryptoLists.MainList
                }
            };

            return View(viewModel);
        }
    }
}