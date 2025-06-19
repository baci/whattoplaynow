using Domain.Entities;

namespace Application.Repositories
{
    public interface IQuestionRepository
    {
        Task<IEnumerable<Question>> GetAllAsync();
        Task<Question?> GetByIdAsync(int id);
        Task AddAsync(Question question);
        Task<IEnumerable<Question>> GetByIdsAsync(IEnumerable<int> ids);
    }
} 