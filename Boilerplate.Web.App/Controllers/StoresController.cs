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
    public class StoresController : Controller
    {
        private readonly ProjectContext _context;

        public StoresController(ProjectContext context)
        {
            _context = context;
        }

        
        //Get Stores

        public JsonResult GetStoreJson(int page)
        {

            var paged = _context.Store.ToList().ToPagedList(page, 8);
            var pagedWithMetaData = new { items = paged, metaData = paged.GetMetaData() };
            return Json(pagedWithMetaData);
        }

        

        //Add New Store

        [HttpPost]

        public JsonResult Create([FromBody] Store store)


        {
            if (ModelState.IsValid)
            {
                _context.Add(store);
                _context.SaveChanges();

            }
            return Json(store);

        }
        //Edit Store
        [HttpPut]

        public JsonResult EditStore([FromBody]Store store)
        {
            if (!StoreExists(store.Id))
            {
                return Json("Store Id Not Found");
            }

            if (ModelState.IsValid)
            {
                try
                {

                    _context.Update(store);
                    _context.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!StoreExists(store.Id))
                    {
                        return Json("Store Id not exist");
                    }
                    else
                    {
                        throw;
                    }
                }

            }
            return Json(store);
        }

        //Delete Store
        [HttpPost]
        public JsonResult DeleteStore(int id, [FromBody]Store store)
        {

            var sto = _context.Store.Find(store.Id);
            _context.Entry(sto).Collection(c => c.Sales).Load();
            if (sto.Sales.Count > 0)
            {
                foreach (var s in sto.Sales)
                {
                    _context.Sales.Remove(s);
                }
            }
            _context.Store.Remove(sto);
            _context.SaveChanges();

            return Json("Store Deleted Successfully");
        }
       



        private bool StoreExists(int id)
        {
            return _context.Store.Any(e => e.Id == id);
        }
    }
}
