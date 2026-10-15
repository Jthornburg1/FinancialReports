using Microsoft.EntityFrameworkCore;

public class ReportsDbContext : DbContext
{
  public ReportsDbContext(DbContextOptions<ReportsDbContext> options) : base(options)
  {
  }

  public DbSet<Transaction> Transactions => Set<Transaction>();
}