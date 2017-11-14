using System;
using System.Web.Mvc;
using Data.Entities;
using Data.Entities.Enums;
using Data.Helpers;
using Data.Helpers.Interfaces;
using Data.StaticHelpers;
using MyPiApp.Extensions;

namespace MyPiApp.Controllers.ApiControllers
{

    [RoutePrefix("Api")]
    public class CoinPriceApiController : BaseController
    {
        private readonly ICoinPricesHelper _coinPricesHelper;

        public CoinPriceApiController(ICoinPricesHelper coinPricesHelper) 
        {
            _coinPricesHelper = coinPricesHelper;
        }


        [Route("CoinPrice/{coinSymbol}/{conversionSymbol}/{timeSpan}")]
        [HttpGet]
        [OutputCache(Duration = 30)]
        public JsonResult CoinPrice(string coinSymbol, string conversionSymbol, TimeSpansEnum timeSpan)
        {
            double currentPrice = _coinPricesHelper.GetPrice(coinSymbol, conversionSymbol);
            double yesterdayPrice = _coinPricesHelper.GetHistoricalPrice(coinSymbol, conversionSymbol, timeSpan);
            double priceDifference = (currentPrice - yesterdayPrice).To2DecimalPoints();
            double priceDifferencePercentage = (((currentPrice - yesterdayPrice) / Math.Abs(yesterdayPrice)) * 100).To2DecimalPoints();

            return Json(new Crypto
            {
                Price = currentPrice,
                PriceDifference = priceDifference,
                PriceDifferencePercentage = priceDifferencePercentage
            }, JsonRequestBehavior.AllowGet);
        }
    }
}