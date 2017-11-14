using System.ComponentModel.DataAnnotations;

namespace Data.Entities.Enums
{
    public enum TimeSpansEnum
    {
        [Display(Name = "Five Mins")]
        FiveMins = 600,

        [Display(Name = "Fifteen Mins")]
        FifteenMins = 900,

        [Display(Name = "Thirty Mins")]
        ThirtyMins = 1800,

        [Display(Name = "One Hour")]
        OneHour = 3600,

        [Display(Name = "One Day")]
        OneDay = 86400,

        [Display(Name = "One Week")]
        OneWeek = 86400 * 7,

        [Display(Name = "One Month")]
        OneMonth = 86400 * 31,

        [Display(Name = "One Year")]
        OneYear = 86400 * 365
    }
}
