<script>
  import SponsorForm from '$lib/components/admin/SponsorForm.svelte';
  import { ArrowLeft } from 'lucide-svelte';
</script>

<div class="fm-container">
  <!-- Breadcrumb -->
  <div class="fm-breadcrumb">
    <a href="/admin" class="fm-breadcrumb-link">
      <ArrowLeft size={16} />
      <span>Retour au tableau de bord</span>
    </a>
  </div>

  <!-- Form -->
  <SponsorForm mode="create" />
</div>

<style>
  .fm-container {
    max-width: 1400px;
    margin: 0 auto;
    padding-top: 1rem;
  }

  .fm-breadcrumb {
    margin-bottom: 1.5rem;
  }

  .fm-breadcrumb-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.875rem;
    margin-bottom: 2rem;
    border: 1px solid #d0d0d0;
    background: white;
    color: #1a4d7a;
    font-size: 0.8125rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s;
  }

  .fm-breadcrumb-link:hover {
    background: #f8f8f8;
    border-color: #1a4d7a;
  }

  @media (min-width: 640px) {
    .fm-breadcrumb-link {
      font-size: 0.875rem;
      padding: 0.5rem 1rem;
      gap: 0.625rem;
    }
  }

  @media (min-width: 768px) {

  }
</style>