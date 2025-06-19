using Application.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly ApplicationDbContext _context;

        public QuestionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Question>> GetAllAsync() =>
            await _context.Questions.ToListAsync();

        public async Task<Question?> GetByIdAsync(int id) =>
            await _context.Questions.FindAsync(id);

        public async Task AddAsync(Question question)
        {
            _context.Questions.Add(question);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Question>> GetByIdsAsync(IEnumerable<int> ids) =>
            await _context.Questions.Where(q => ids.Contains(q.Id)).ToListAsync();
    }
} 