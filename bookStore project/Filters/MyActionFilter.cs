using Microsoft.AspNetCore.Mvc.Filters;

namespace bookStore_project.Filters
{
    public class MyActionFilter :Attribute, IActionFilter
    {
        private readonly string _name;
        public MyActionFilter(string name) 
        {
            _name = name;
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {
            Console.WriteLine("OnActionExecuted:", this._name);
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            Console.WriteLine("OnActionExecuting:", this._name);
        }
    }
}
