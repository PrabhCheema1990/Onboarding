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
    public class ProductsController : Controller
    {
        private readonly ProjectContext _context;

        public ProductsController(ProjectContext context)
        {
            _context = context;
        }

        // GET: Products


        public JsonResult GetProductJson(int page)
        {

            var paged = _context.Product.ToList().ToPagedList(page, 8);
            var pagedWithMetaData = new { items = paged, metaData = paged.GetMetaData() };
            return Json(pagedWithMetaData);
        }


       
        //Add New Product
        [HttpPost]
       
        public JsonResult Create(int id, [FromBody] Product product)
        {
            if (ModelState.IsValid)
            {
                _context.Add(product);
                _context.SaveChanges();

            }
            return Json(product);

        }

        //Edit Product
        [HttpPut]
        public JsonResult EditProduct([FromBody]Product product)
        {
            if (!ProductExists(product.Id))
            {
                return Json("Product Id Not Found");
            }

            if (ModelState.IsValid)
            {
                try
                {

                    _context.Update(product);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductExists(product.Id))
                    {
                        return Json("Product Id not exist");
                    }
                    else
                    {
                        throw;
                    }
                }

            }
            return Json(product);
        }

        //Delete Product

        [HttpPost]
        public JsonResult DeleteProduct(int id, [FromBody]Product product)
        {

            var prod = _context.Product.Find(product.Id);
            _context.Entry(prod).Collection(c => c.Sales).Load();
            if (prod.Sales.Count > 0)
            {
                foreach (var s in prod.Sales)
                {
                    _context.Sales.Remove(s);
                }
            }
            _context.Product.Remove(prod);
            _context.SaveChanges();

            return Json("Product Deleted Successfully");
        }

        

      
    

        private bool ProductExists(int id)
        {
            return _context.Product.Any(e => e.Id == id);
        }
    }
}
