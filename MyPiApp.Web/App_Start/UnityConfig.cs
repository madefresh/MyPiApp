using System.Web.Mvc;
using Data.Helpers;
using Data.Helpers.Interfaces;
using Microsoft.Practices.Unity;
using Unity.Mvc5;

namespace MyPiApp
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();

            container.RegisterType<ILoggerHelper, LoggerHelper>();
            container.RegisterType<ICoinPricesHelper, CoinPricesHelper>();

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}