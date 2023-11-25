using Core.Entities;

namespace Core.Interfaces
{
    public interface IUnitOfWork : IDisposable //Dispose context after transactions
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        Task<int> Complete(); //return the number of changes 
    }
}