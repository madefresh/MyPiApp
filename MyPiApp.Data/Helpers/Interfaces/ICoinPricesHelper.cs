using Data.Entities.Enums;

namespace Data.Helpers.Interfaces
{
    public interface ICoinPricesHelper
    {
        double GetPrice(string coinSymbol, string conversion, int? attempt = 0);
        double GetHistoricalPrice(string coinSymbol, string conversion, TimeSpansEnum timeSpan, int? attempt = 0);
    }
}
