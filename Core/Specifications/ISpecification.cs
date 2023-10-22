using System.Linq.Expressions;

namespace Core.Specifications
{
    public interface ISpecification<T>
    {
        //General specification
        Expression<Func<T, bool>> Criteria { get; }
        List<Expression<Func<T, object>>> Includes { get; }

        //Sorting
        Expression<Func<T, object>> OrderBy { get; }
        Expression<Func<T, object>> OrderByDescending { get; }

        //Pagination
        int Take { get; }
        int Skip { get; }
        bool IsPagingEnabled { get; }

    }
}