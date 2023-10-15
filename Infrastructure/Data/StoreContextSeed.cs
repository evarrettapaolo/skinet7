using System.Text.Json;
using Core.Entities;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public static async Task SeedAsync(StoreContext context)
        {
            //Seeding brands table
            if (!context.ProductBrands.Any())
            {
                //directory starts from solution level
                var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");
                var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
                context.ProductBrands.AddRange(brands);
            }

            //Seeding types table
            if (!context.ProductTypes.Any())
            {
                //directory starts from solution level
                var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");
                var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
                context.ProductTypes.AddRange(types);
            }

            //Seeding products table
            if (!context.Products.Any())
            {
                //directory starts from solution level
                var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                context.Products.AddRange(products);
            }
            
            //Save any changes to database
            if(context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
    }
}