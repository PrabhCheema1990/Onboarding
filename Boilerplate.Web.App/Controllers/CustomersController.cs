using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Boilerplate.Web.App.Models;
using PagedList;
using Newtonsoft.Json;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomersController : Controller
    {
        private readonly ProjectContext _context;
        public CustomersController(ProjectContext context)
        {
            _context = context;
        }

        // GET: Customers

       
        public JsonResult GetCustomerJson(int page)
        {

            var paged = _context.Customer.ToList().ToPagedList(page, 8);
            var pagedWithMetaData = new { items = paged, metaData = paged.GetMetaData() };
            return Json(pagedWithMetaData);
        }



        //Add New Customer

        [HttpPost]
        public JsonResult CreateCust([FromBody] Customer customer)
        {

            if (ModelState.IsValid)
            {
                _context.Add(customer);
                _context.SaveChanges();

            }
            return Json(customer);

        }

        
        //Edit Customer

        [HttpPut]
        public JsonResult EditCustomer([FromBody]Customer customer)
        {
            if (!CustomerExists(customer.Id))
            {
                return Json("Customer Id Not Found");
            }

            if (ModelState.IsValid)
            {
                try
                {

                    _context.Update(customer);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CustomerExists(customer.Id))
                    {
                        return Json("Customer Id not exist");
                    }
                    else
                    {
                        throw;
                    }
                }

            }
            return Json(customer);
        }

       


       

        //Delete Customer
        [HttpPost]


        public JsonResult DeleteCustomer(int id, [FromBody]Customer customer)
        {

                var cust = _context.Customer.Find(customer.Id);
                _context.Entry(cust).Collection(c => c.Sales).Load();
                if (cust.Sales.Count > 0)
                {
                    foreach (var s in cust.Sales)
                    {
                        _context.Sales.Remove(s);
                    }
                }
                _context.Customer.Remove(cust);
                _context.SaveChanges();

                return Json("Customer Deleted Successfully");
            }
      




        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
