<template>
  <div class="container">
    <header class="header">
      <div class="header-content">
        <img src="https://png.pngtree.com/png-vector/20220922/ourmid/pngtree-cart-shop-logo-supermarket-cart-market-vector-png-image_39324060.png" class="logo" />
        <div class="header-text">
          <h1>ELECTRONICOS</h1>
          <p>Tecnología de punta al mejor precio</p>
        </div>
      </div>
      <nav class="header-nav">
        <NuxtLink to="/" class="nav-link">Tienda</NuxtLink >
        <NuxtLink to="/ofertas" class="nav-link">Ofertas</NuxtLink>
        <NuxtLink to="/nuevos" class="nav-link">Nuevos</NuxtLink>
        <NuxtLink to="/about" class="nav-link active">Nosotros</NuxtLink>
      </nav>
    </header>

    <div class="about-content">
      <div class="about-card">
        <h1>Acerca de nosotros</h1>
        <div class="divider"></div>
        <p class="subtitle">
          Somos tu tienda de confianza en productos electrónicos de última generación
        </p>

        <div class="info-sections">
          <div class="info-box">
            <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
            <h3>Misión</h3>
            <p>Brindar productos tecnológicos de calidad al mejor precio del mercado</p>
          </div>

          <div class="info-box">
            <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <h3>Visión</h3>
            <p>Ser la tienda líder de electrónicos en Guatemala</p>
          </div>

          <div class="info-box">
            <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <h3>Valores</h3>
            <p>Calidad, honestidad y servicio al cliente</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #0D1821 0%, #344966 100%);
  border-radius: 20px;
  padding: 30px 40px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  box-shadow: 0 10px 40px rgba(13, 24, 33, 0.2);
  flex-wrap: wrap;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}

.header-text h1 {
  color: #F0F4EF;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.header-text p {
  color: #B4CDED;
  margin: 5px 0 0;
  font-size: 1rem;
}

.header-nav {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.nav-link {
  padding: 10px 20px;
  color: #F0F4EF;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.nav-link:hover {
  background: rgba(240, 244, 239, 0.1);
  border-color: #B4CDED;
}

.nav-link.active {
  background: #BFCC94;
  color: #0D1821;
}

.about-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.about-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 60px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(13, 24, 33, 0.1);
  max-width: 800px;
  width: 100%;
  border: 2px solid #F0F4EF;
}

.about-card h1 {
  color: #0D1821;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #0D1821 0%, #344966 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.divider {
  width: 100px;
  height: 4px;
  background: linear-gradient(135deg, #BFCC94 0%, #344966 100%);
  margin: 0 auto 30px;
  border-radius: 2px;
}

.subtitle {
  color: #344966;
  font-size: 1.2rem;
  margin-bottom: 50px;
  line-height: 1.6;
}

.info-sections {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.info-box {
  background: #F0F4EF;
  border-radius: 16px;
  padding: 30px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.info-box:hover {
  transform: translateY(-5px);
  border-color: #B4CDED;
  box-shadow: 0 10px 30px rgba(13, 24, 33, 0.1);
}

.info-icon {
  width: 48px;
  height: 48px;
  color: #344966;
  margin-bottom: 15px;
}

.info-box h3 {
  color: #0D1821;
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 600;
}

.info-box p {
  color: #344966;
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .header-content {
    flex-direction: column;
  }

  .header-nav {
    justify-content: center;
    width: 100%;
  }

  .about-card {
    padding: 40px 20px;
  }

  .about-card h1 {
    font-size: 2rem;
  }

  .info-sections {
    grid-template-columns: 1fr;
  }
}
</style>
