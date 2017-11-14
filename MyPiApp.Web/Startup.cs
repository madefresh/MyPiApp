using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MyPiApp.Startup))]
namespace MyPiApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
