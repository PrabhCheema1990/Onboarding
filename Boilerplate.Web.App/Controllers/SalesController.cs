using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Boilerplate.Web.App.Models;
using PagedList;


namespace Boilerplate.Web.App.Controllers
{
    public class SalesController : Controller
    {
        private readonly ProjectContext _context;

        public SalesController(ProjectContext context)
        {
            _context = context;
        }
       
      
        public JsonResult GetSalesJson(int page)
        {
            //2019-04-12
            var salesContext = _context.Sales.Select(p => new SalesData 
            {
                CustomerId = p.Customer.Id,
                CustomerName = p.Customer.Name,
               Id=p.Id,
                ProductId = p.Product.Id,
                ProductName = p.Product.Name,
                StoreId = p.Store.Id,
                StoreName = p.Store.Name,
                DateSold = p.DateSold.ToString("yyyy-MM-dd")
            });
            var paged = salesContext.ToList().ToPagedList(page, 8);
            var pagedWithMetaData = new { items = paged, metaData = paged.GetMetaData() };
            return Json(pagedWithMetaData);
        }

        public JsonResult GetDropdownJson()
        {
            var customer = _context.Customer.Select(c => new Dropdown { Value = c.Id, Text = c.Name }).ToList(); 
            var product = _context.Product.Select(p => new Dropdown { Value = p.Id, Text = p.Name }).ToList();
            var store = _context.Store.Select(p => new Dropdown { Value = p.Id, Text = p.Name }).ToList();
            return Json(new { customer, product, store });
        }
        // GET: Sales
        public async Task<IActionResult> Index()
        {
            var projectContext = _context.Sales.Include(s => s.Product).Include(s => s.Store);
            return View(await projectContext.ToListAsync());
        }

        // GET: Sales/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var sales = await _context.Sales
                .Include(s => s.Product)
                .Include(s => s.Store)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (sales == null)
            {
                return NotFound();
            }

            return View(sales);
        }

        // GET: Sales/Create
       

        // POST: Sales/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        public JsonResult Create([FromBody] Sales sale)


        {
            if (ModelState.IsValid)
            {
                _context.Add(sale);
                _context.SaveChanges();

            }
            return Json(sale);

        }

        [HttpPut]
        public JsonResult EditSale([FromBody]Sales sale )
        {
            if (!SalesExists(sale.Id))
            {
                return Json(" Id Not Found");
            }

            if (ModelState.IsValid)
            {
                try
                {
                   
                    _context.Update(sale);

                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SalesExists(sale.Id))
                    {
                        return Json("Sales Id not exist");
                    }
                    else
                    {
                        throw;
                    }
                }
               
            }
            return Json(sale);
        }





        [HttpPost]

        public JsonResult DeleteSale(int id, [FromBody]Sales sale)
        {
            if (!SalesExists(sale.Id))
            {
                return Json("Sales Id Not Found");
            }

            if (ModelState.IsValid)
            {
                _context.Sales.Remove(sale);
                _context.SaveChanges();


                return new JsonResult("Sales Deleted Successfully!");

            }
            return new JsonResult(sale);
        }

       
      
       
        private bool SalesExists(int id)
        {
            return _context.Sales.Any(e => e.Id == id);
        }
    }
}
