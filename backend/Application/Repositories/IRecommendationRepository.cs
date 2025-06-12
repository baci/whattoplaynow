using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public interface IRecommendationRepository
    {
        Task<IEnumerable<Recommendation>> GetAllAsync();
        Task<Recommendation> GetByIdAsync(int id);
        Task AddAsync(Recommendation recommendation);
        // Add update/delete as needed
    }
} 