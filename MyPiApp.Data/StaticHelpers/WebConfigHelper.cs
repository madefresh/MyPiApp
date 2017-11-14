using Data.Entities;
using Data.Entities.Constants;

namespace Data.StaticHelpers
{
    public static class WebConfigHelper
    {
        public static Currency LocalCurrency => Currencies.USD;
        public static string LocalCurrencySymbol => LocalCurrency.TextSymbol;
        public static string LocalCurrencyUnicodeSymbol => LocalCurrency.UnicodeSymbol;
    }
}