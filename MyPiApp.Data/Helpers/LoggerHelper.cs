using System;
using System.Diagnostics;
using Data.Helpers.Interfaces;

namespace Data.Helpers
{
    public class LoggerHelper : ILoggerHelper
    {
        public void LogError(Exception e)
        {
            Debug.WriteLine(e.Message);
        }
    }
}