using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();
        
        //For specification pattern and Navigation property
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec);
        
        /// <summary>
        /// Returns the quantity of an item
        /// </summary>
        /// <param name="spec"></param>
        /// <returns></returns>
        Task<int> CountAsync(ISpecification<T> spec);
    }
}