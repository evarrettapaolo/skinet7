using System.Reflection;
using System.Text.Json;
using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Infrastructure.Data
{
  public class StoreContextSeed
  {
    public static async Task SeedAsync(StoreContext context)
    {
      var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

      //Seeding brands table
      if (!context.ProductBrands.Any())
      {
        //directory starts from solution level
        var brandsData = File.ReadAllText(path + @"/Data/SeedData/brands.json");
        var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);
        context.ProductBrands.AddRange(brands);
      }

      //Seeding types table
      if (!context.ProductTypes.Any())
      {
        //directory starts from solution level
        var typesData = File.ReadAllText(path + @"/Data/SeedData/types.json");
        var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);
        context.ProductTypes.AddRange(types);
      }

      //Seeding products table
      if (!context.Products.Any())
      {
        //directory starts from solution level
        var productsData = File.ReadAllText(path + @"/Data/SeedData/products.json");
        var products = JsonSerializer.Deserialize<List<Product>>(productsData);
        context.Products.AddRange(products);
      }

      //Seeding deliver methods table
      if (!context.DeliveryMethods.Any())
      {
        //directory starts from solution level
        var deliveryData = File.ReadAllText(path + @"/Data/SeedData/delivery.json");
        var methods = JsonSerializer.Deserialize<List<DeliveryMethod>>(deliveryData);
        context.DeliveryMethods.AddRange(methods);
      }

      //Save any changes to database
      if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
    }
  }
}