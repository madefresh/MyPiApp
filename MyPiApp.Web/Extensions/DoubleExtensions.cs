namespace MyPiApp.Extensions
{
    public static class DoubleExtensions
    {
        public static double To2DecimalPoints(this double val)
        {
            return double.Parse(string.Format("{0:0.00}", val));
        }
    }
}