namespace Data.Entities
{
    public class Currency
    {
        public string TextSymbol { get; set; }
        public string UnicodeSymbol { get; set; }

        public Currency(string textSymbol, string unicodeSymbol)
        {
            this.TextSymbol = textSymbol;
            this.UnicodeSymbol = unicodeSymbol;
        }
    }
}
