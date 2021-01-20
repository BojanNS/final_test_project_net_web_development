namespace BojanZelenkovic.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<BojanZelenkovic.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BojanZelenkovic.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            context.Jedinice.AddOrUpdate(x => x.Id,
                new Models.OrganizacionaJedinica() { Id = 1, Ime = "Administracija", GodinaOsnivanja = 2010 },
                new Models.OrganizacionaJedinica() { Id = 2, Ime = "Racunovodstvo", GodinaOsnivanja = 2012 },
                new Models.OrganizacionaJedinica() { Id = 3, Ime = "Razvoj", GodinaOsnivanja = 2013 }
                );
            context.SaveChanges();

            context.Zaposleni.AddOrUpdate(x => x.Id,
                new Models.Zaposleni() { Id = 1, ImeIPrezime = "Pera Peric", Rola = "Direktor", GodinaRodjenja = 1980, GodinaZaposlenja = 2010, Plata = 3000m, OrganizacionaJedinicaId = 1 },
                new Models.Zaposleni() { Id = 2, ImeIPrezime = "Mika Mikic", Rola = "Sekretar", GodinaRodjenja = 1985, GodinaZaposlenja = 2011, Plata = 1000m, OrganizacionaJedinicaId = 1 },
                new Models.Zaposleni() { Id = 3, ImeIPrezime = "Iva Ivic", Rola = "Racunovodja", GodinaRodjenja = 1981, GodinaZaposlenja = 2012, Plata = 2000m, OrganizacionaJedinicaId = 2 },
                new Models.Zaposleni() { Id = 4, ImeIPrezime = "Zika Zikic", Rola = "Inzenjer", GodinaRodjenja = 1982, GodinaZaposlenja = 2013, Plata = 2500m, OrganizacionaJedinicaId = 3 },
                new Models.Zaposleni() { Id = 5, ImeIPrezime = "Ana Anic", Rola = "Inzenjer", GodinaRodjenja = 1984, GodinaZaposlenja = 2014, Plata = 2500m, OrganizacionaJedinicaId = 3 }


                );
            context.SaveChanges();
        }
    }
}
