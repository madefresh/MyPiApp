using System.Collections.Generic;

namespace Data.Entities
{
    public static class TestCryptoLists
    {
        public static List<Crypto> MainList = new List<Crypto>
        {
            new Crypto("Bitcoin", "BTC", 1, "#1c2833", "https://www.youtube.com/embed/vcpmBYfvF_I?autoplay=1", "https://www.youtube.com/embed/-FeebOsdDE4?autoplay=1"),
            new Crypto("Ethereum", "ETH", 2, "#2e4356", "https://www.youtube.com/embed/cpbbuaIA3Ds?start=41&autoplay=1", "https://www.youtube.com/embed/_CVXWoVr9OU?autoplay=1"),
            new Crypto("Litecoin", "LTC", 3, "#1c2833", "https://www.youtube.com/watch?v=vJwKKKd2ZYE?autoplay=1", "https://www.youtube.com/embed/H9GixBSz3nM?autoplay=1"),
            //new Crypto("NEO", "NEO", 4, "#645959")
        };
    }
}