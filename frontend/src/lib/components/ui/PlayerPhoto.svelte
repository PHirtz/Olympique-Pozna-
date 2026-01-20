<script>
  export let src;
  export let alt;
  export let className = '';
  export let fallback = '/no-pics.jpg';

  let imageSrc = src || fallback;
  let imageError = false;

  function handleError(e) {
    if (!imageError) {
      imageError = true;
      e.target.src = fallback;
    }
  }

  // Réinitialiser si src change
  $: {
    imageSrc = src || fallback;
    imageError = false;
  }
</script>

<img 
  src={imageSrc}
  {alt}
  class={className}
  on:error={handleError}
/>