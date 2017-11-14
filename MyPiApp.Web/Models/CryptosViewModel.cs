using System.Collections.Generic;
using Data.Entities;

namespace MyPiApp.Models
{
    public class CryptosViewModel
    {
        public List<Crypto> Cryptos { get; set; }

        public CryptosViewModel()
        {
            this.Cryptos = new List<Crypto>();
        }
    }
}