/// <reference path="../typings/jquery.d.ts" />
var HomePage = /** @class */ (function () {
    function HomePage() {
        var _this = this;
        this.cryptoPanelsSelector = ".crypto";
        this.timeSpanDropdown = ".time-span-dropdown";
        this.currencyDropdown = ".currency-dropdown";
        this.startCryptoPricesInterval();
        $(document).on("change", this.currencyDropdown, function () { _this.timeSpanDropdownUpdated(); });
        $(document).on("change", this.timeSpanDropdown, function () { _this.resetPanels(); });
    }
    HomePage.prototype.timeSpanDropdownUpdated = function () {
        $(".alert-above").val("");
        $(".alert-below").val("");
        $(".alert-above").first().focus();
        this.resetPanels();
    };
    HomePage.prototype.resetPanels = function () {
        var $cryptoPanels = $(this.cryptoPanelsSelector);
        $cryptoPanels.find("h2").html("Loading...");
    };
    HomePage.prototype.startCryptoPricesInterval = function () {
        var _this = this;
        this.loadCryptoPrices();
        setInterval(function () { _this.loadCryptoPrices(); }, 5000);
    };
    HomePage.prototype.formatCurrencyVal = function (val, currencySymbol) {
        if (val < 0) {
            var formattedVal = val.toString().replace("-", "" + currencySymbol);
            return formattedVal;
        }
        else {
            return "" + currencySymbol + val;
        }
    };
    HomePage.prototype.formatPercentageVal = function (val) {
        if (val < 0) {
            return val.toString();
        }
        else {
            return "+" + val.toString();
        }
    };
    HomePage.prototype.loadCryptoPrices = function () {
        var _this = this;
        var $cryptoPanels = $(this.cryptoPanelsSelector);
        var _loop_1 = function (i) {
            var $cryptoPanel = $($cryptoPanels[i]);
            var $dataPanel = $cryptoPanel.find(".crypto-data");
            var $priceInfoSpan = $cryptoPanel.find("h2");
            var timeSpan = $(this_1.timeSpanDropdown).val();
            var currencyDropdown = $(this_1.currencyDropdown + " option:selected");
            var currencySymbol = $(currencyDropdown).attr("value");
            var currencyUnicodeSymbol = $(currencyDropdown).attr("data-symbol");
            var $alertAbove = $cryptoPanel.find(".alert-above");
            var alertAboveVal = $alertAbove.val();
            var $alertBelow = $cryptoPanel.find(".alert-below");
            var alertBelowVal = $alertBelow.val();
            var soundAlertAbove = $cryptoPanel.attr("data-sound-alert-above");
            var soundAlertBelow = $cryptoPanel.attr("data-sound-alert-below");
            var coinSymbol = $cryptoPanel.attr("data-symbol");
            $.get("/Api/CoinPrice/" + coinSymbol + "/" + currencySymbol + "/" + timeSpan, function (response) {
                var price = response.Price;
                var priceDifference = response.PriceDifference;
                var priceDifferencePerc = response.PriceDifferencePercentage;
                var priceFormatted = _this.formatCurrencyVal(price, currencyUnicodeSymbol);
                var priceDifferenceFormatted = _this.formatCurrencyVal(priceDifference, currencyUnicodeSymbol);
                var priceDifferencePercentageFormatted = _this.formatPercentageVal(priceDifferencePerc);
                var aboveIframeClass = "above-sound-" + coinSymbol;
                var belowIframeClass = "below-sound-" + coinSymbol;
                if (alertAboveVal.length > 0 && price > alertAboveVal) {
                    if ($("." + aboveIframeClass).length === 0 && !$alertAbove.is(":focus")) {
                        $("body").append("<iframe class=\"" + aboveIframeClass + "\" src=\"" + soundAlertAbove + "\"></iframe>");
                    }
                }
                else {
                    $("." + aboveIframeClass).remove();
                }
                if (alertBelowVal.length > 0 && price < alertBelowVal) {
                    if ($("." + belowIframeClass).length === 0 && !$alertBelow.is(":focus")) {
                        $("body").append("<iframe class=\"" + belowIframeClass + "\" src=\"" + soundAlertBelow + "\"></iframe>");
                    }
                }
                else {
                    $("." + belowIframeClass).remove();
                }
                var colourClass = priceDifference > 0 ? "positive" : "negative";
                var priceDiffIcon = priceDifference > 0
                    ? "small-icon fa fa-arrow-circle-up"
                    : "small-icon fa fa-arrow-circle-down";
                var priceChangeHtml = "<span class=\"price-difference " + colourClass + "\">" +
                    ("<i class=\"" + priceDiffIcon + "\"> </i> " + priceDifferenceFormatted + " (" + priceDifferencePercentageFormatted + "%)</span>");
                var priceInfoHtml = "<span class=\"price\">" + priceFormatted + "</span> " + priceChangeHtml;
                if (priceInfoHtml != $priceInfoSpan.html() && $cryptoPanel.attr("data-is-loaded") == "1") {
                    $dataPanel.addClass("upddated-anim");
                    setTimeout(function () {
                        $dataPanel.removeClass("upddated-anim");
                    }, 250);
                }
                $cryptoPanel.attr("data-is-loaded", 1);
                $priceInfoSpan.html(priceInfoHtml);
            });
        };
        var this_1 = this;
        for (var i = 0; i < $cryptoPanels.length; i++) {
            _loop_1(i);
        }
    };
    return HomePage;
}());
$(document).ready(function () {
    var home = new HomePage();
});
//# sourceMappingURL=index.js.map