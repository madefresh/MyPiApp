namespace Data.Entities.Constants
{
    public static class Currencies
    {
        public static Currency GBP => new Currency("GBP", "£");
        public static Currency EUR => new Currency("EUR", "€");
        public static Currency USD => new Currency("USD", "$");
    }
}