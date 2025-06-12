using Application.Repositories;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class RecommendationRepository : IRecommendationRepository
    {
        private readonly ApplicationDbContext _context;

        public RecommendationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Recommendation>> GetAllAsync() =>
            await _context.Recommendations.ToListAsync();

        public async Task<Recommendation> GetByIdAsync(int id) =>
            await _context.Recommendations.FindAsync(id);

        public async Task AddAsync(Recommendation recommendation)
        {
            _context.Recommendations.Add(recommendation);
            await _context.SaveChangesAsync();
        }
    }
} 