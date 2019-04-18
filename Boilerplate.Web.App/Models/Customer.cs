using System;
using System.Collections.Generic;

namespace Boilerplate.Web.App.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public ICollection<Sales> Sales { get; set; }
    }
}
