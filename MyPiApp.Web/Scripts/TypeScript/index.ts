/// <reference path="../typings/jquery.d.ts" />
class HomePage {

    private cryptoPanelsSelector = ".crypto";
    private timeSpanDropdown = ".time-span-dropdown";
    private currencyDropdown = ".currency-dropdown";

    constructor() {
        this.startCryptoPricesInterval();
        $(document).on("change", this.currencyDropdown, () => { this.timeSpanDropdownUpdated(); });
        $(document).on("change", this.timeSpanDropdown, () => { this.resetPanels(); });
    }


    timeSpanDropdownUpdated(): void {
        $(".alert-above").val("");
        $(".alert-below").val("");
        $(".alert-above").first().focus();
        this.resetPanels();
    }

    resetPanels(): void {
        let $cryptoPanels = $(this.cryptoPanelsSelector);
        $cryptoPanels.find("h2").html("Loading...");
    }


    startCryptoPricesInterval(): void {
        this.loadCryptoPrices();
        setInterval(() => { this.loadCryptoPrices(); }, 5000);
    }


    formatCurrencyVal(val: number, currencySymbol: string): string {

        if (val < 0) {
            let formattedVal = val.toString().replace("-", `${currencySymbol}`);
            return formattedVal;
        } else {
            return `${currencySymbol}${val}`;
        }
    }

    formatPercentageVal(val: number): string {

        if (val < 0) {
            return val.toString();
        } else {
            return `+${val.toString()}`;
        }
    }


    loadCryptoPrices(): void {

        let $cryptoPanels: JQuery = $(this.cryptoPanelsSelector);

        for (let i = 0; i < $cryptoPanels.length; i++) {

            let $cryptoPanel = $($cryptoPanels[i]);
            let $dataPanel = $cryptoPanel.find(".crypto-data");
            let $priceInfoSpan = $cryptoPanel.find("h2");
            let timeSpan = $(this.timeSpanDropdown).val();
            let currencyDropdown = $(this.currencyDropdown + " option:selected");
            let currencySymbol = $(currencyDropdown).attr("value");
            let currencyUnicodeSymbol = $(currencyDropdown).attr("data-symbol");
            let $alertAbove = $cryptoPanel.find(".alert-above");
            let alertAboveVal = $alertAbove.val();
            let $alertBelow = $cryptoPanel.find(".alert-below");
            let alertBelowVal = $alertBelow.val();
            let soundAlertAbove = $cryptoPanel.attr("data-sound-alert-above");
            let soundAlertBelow = $cryptoPanel.attr("data-sound-alert-below");
            let coinSymbol = $cryptoPanel.attr("data-symbol");


            $.get(`/Api/CoinPrice/${coinSymbol}/${currencySymbol}/${timeSpan}`,
                (response) => {

                    let price = response.Price;
                    let priceDifference = response.PriceDifference;
                    let priceDifferencePerc = response.PriceDifferencePercentage;

                    let priceFormatted = this.formatCurrencyVal(price, currencyUnicodeSymbol);
                    let priceDifferenceFormatted = this.formatCurrencyVal(priceDifference, currencyUnicodeSymbol);
                    let priceDifferencePercentageFormatted = this.formatPercentageVal(priceDifferencePerc);

                    let aboveIframeClass = `above-sound-${coinSymbol}`; 
                    let belowIframeClass = `below-sound-${coinSymbol}`; 

                    if (alertAboveVal.length > 0 && price > alertAboveVal) {
                        if ($("." + aboveIframeClass).length === 0 && !$alertAbove.is(":focus")) {
                            $("body").append(`<iframe class="${aboveIframeClass}" src="${soundAlertAbove}"></iframe>`);
                        }
                    } else {
                        $("." + aboveIframeClass).remove();
                    }


                    if (alertBelowVal.length > 0 && price < alertBelowVal) {
                        if ($("." + belowIframeClass).length === 0 && !$alertBelow.is(":focus")) {
                            $("body").append(`<iframe class="${belowIframeClass}" src="${soundAlertBelow}"></iframe>`);
                        }
                    } else {
                        $("." + belowIframeClass).remove();
                    }



                    let colourClass = priceDifference > 0 ? "positive" : "negative";
                    let priceDiffIcon = priceDifference > 0
                        ? "small-icon fa fa-arrow-circle-up"
                        : "small-icon fa fa-arrow-circle-down";

                    let priceChangeHtml =
                        `<span class="price-difference ${colourClass}">` +
                        `<i class="${priceDiffIcon}"> </i> ${priceDifferenceFormatted} (${priceDifferencePercentageFormatted}%)</span>`;

                    let priceInfoHtml = `<span class="price">${priceFormatted}</span> ${priceChangeHtml}`;


                    if (priceInfoHtml != $priceInfoSpan.html() && $cryptoPanel.attr("data-is-loaded") == "1") {

                        $dataPanel.addClass("upddated-anim");

                        setTimeout(() => {
                            $dataPanel.removeClass("upddated-anim");
                        }, 250);
                    }


                    $cryptoPanel.attr("data-is-loaded", 1);
                    $priceInfoSpan.html(priceInfoHtml);

                });
        }
    }
}


$(document).ready(() => {
    let home = new HomePage();
});