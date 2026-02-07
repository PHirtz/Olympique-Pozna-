<script>
  export let src;
  export let alt;
  export let className = '';
  export let fallback = '/logo.png';
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  
  // 🔍 DEBUG
  console.log('🖼️ SponsorLogo - API_URL:', API_URL);
  console.log('🖼️ SponsorLogo - src reçu:', src);
  
  function getImageUrl(path) {
    if (!path) return fallback;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const finalUrl = `${API_URL}${path}`;
    console.log('🖼️ SponsorLogo - URL finale:', finalUrl);
    return finalUrl;
  }
  
  let imageSrc = getImageUrl(src);
  let imageError = false;
  
  function handleError(e) {
    console.error('❌ Erreur chargement image:', e.target.src);
    if (!imageError) {
      imageError = true;
      e.target.src = fallback;
    }
  }
  
  $: {
    imageSrc = getImageUrl(src);
    imageError = false;
  }
</script>

<img 
  src={imageSrc}
  {alt}
  class={className}
  on:error={handleError}
/>