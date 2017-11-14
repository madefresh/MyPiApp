namespace Data.Entities
{
    public class Crypto
    {
        public string Name { get; set; }     
        public string Currency { get; set; }
        public double Price { get; set; }
        public double PriceDifference { get; set; }
        public double PriceDifferencePercentage { get; set; }
        public string Symbol { get; set; }
        public int Ordinal { get; set; }
        public string BgColor { get; set; }
        public string AboveSoundAlert { get; set; }
        public string BelowSoundAlert { get; set; }

        public Crypto(string name, string symbol, int ordinal, string bgColor, string aboveSoundAlert, string belowSoundAlert)
        {
            this.Name = name;
            this.Symbol = symbol;
            this.Ordinal = ordinal;
            this.BgColor = bgColor;
            this.AboveSoundAlert = aboveSoundAlert;
            this.BelowSoundAlert = belowSoundAlert;
        }

        public Crypto()
        {
        }
    }
}