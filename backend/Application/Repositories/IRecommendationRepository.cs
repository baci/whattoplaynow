using Domain.Entities;

namespace Application.Repositories
{
    public interface IRecommendationRepository
    {
        Task<IEnumerable<Recommendation>> GetAllAsync();
        Task<Recommendation?> GetByIdAsync(int id);
        Task AddAsync(Recommendation recommendation);
    }
} 