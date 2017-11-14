namespace MyPiApp.Models
{
    public class HomeViewModel
    {
        public CryptosViewModel CryptosViewModel { get; set; }

        public HomeViewModel()
        {
            this.CryptosViewModel = new CryptosViewModel();
        }
    }
}