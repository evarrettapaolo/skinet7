using System.Collections;
using Core.Entities;
using Core.Interfaces;

namespace Infrastructure.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        private Hashtable _repositories;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
        }

        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            //Check if hashtable is empty
            if(_repositories == null ) _repositories = new Hashtable();
            //Store type of entity
            var type = typeof(TEntity).Name;
            //Check if entity type exists
            if(!_repositories.ContainsKey(type))
            {
                //Create an instance of generic type repo
                var repositoryType = typeof(GenericRepository<>);
                //Fill in the instance above with repo type based on entity
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);
                //Add the entity type and repo instance to the UoW hashtable
                _repositories.Add(type, repositoryInstance);
            }

            return (IGenericRepository<TEntity>) _repositories[type];
        }
    }
}