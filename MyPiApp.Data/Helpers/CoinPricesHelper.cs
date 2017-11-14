using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Web.Script.Serialization;
using Data.Entities.Enums;
using Data.Helpers.Interfaces;

namespace Data.Helpers
{
    public class CoinPricesHelper : ICoinPricesHelper
    {

        private readonly ILoggerHelper _loggerHelper;

        private const string ApiBaseUrl = "https://min-api.cryptocompare.com/data/";

        private const string AppUsername = "alexormrod";

        
        public CoinPricesHelper(ILoggerHelper loggerHelper)
        {
            _loggerHelper = loggerHelper;
        }

        public double GetPrice(string coinSymbol, string conversion, int? attempt = 0)
        {

            string apiUrl = $"{ApiBaseUrl}price?fsym={coinSymbol}&tsyms={conversion}";

            try
            {
                using (var wc = new WebClient())
                {
                    var responseStr = wc.DownloadString(apiUrl);
                    var jsonObj = new JavaScriptSerializer().Deserialize<Dictionary<string, string>>(responseStr);
                    var price = double.Parse(jsonObj[conversion]);

                    return price;
                }
            }
            catch (Exception e)
            {
                this._loggerHelper.LogError(e);

                if (attempt < 5)
                {
                    Thread.Sleep(5000);
                    return GetPrice(coinSymbol, conversion, attempt + 1);
                }

                throw;
            }
        }


        public double GetHistoricalPrice(string coinSymbol, string conversion, TimeSpansEnum timeSpan, int? attempt = 0)
        {

            int currentUnixTimestamp = (int)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;
            int unixTimeToFetch = currentUnixTimestamp - (int)timeSpan;

            string apiUrl = $"{ApiBaseUrl}pricehistorical?fsym={coinSymbol}&tsyms={conversion}&ts={unixTimeToFetch}&extraParams={AppUsername}";

            try
            {
                using (var wc = new WebClient())
                {
                    var responseStr = wc.DownloadString(apiUrl);
                    var jsonObj = new JavaScriptSerializer().Deserialize<Dictionary<string, Dictionary<string, string>>>(responseStr);
                    var coinObj = jsonObj[coinSymbol];
                    var price = double.Parse(coinObj[conversion]);

                    return price;
                }
            }
            catch (Exception e)
            {
                this._loggerHelper.LogError(e);

                if (attempt < 5)
                {
                    Thread.Sleep(5000);
                    return GetHistoricalPrice(coinSymbol, conversion, timeSpan, attempt + 1);
                }

                throw;
            }
        }
    }
}