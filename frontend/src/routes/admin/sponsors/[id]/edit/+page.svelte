<script>
  import { page } from '$app/stores';
  import SponsorForm from '$lib/components/admin/SponsorForm.svelte';
  import { ArrowLeft } from 'lucide-svelte';

  $: sponsorId = $page.params.id;
</script>

<div>
  <!-- Breadcrumb -->
  <div class="mb-6">
    <a
      href="/admin/sponsors"
      class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
    >
      <ArrowLeft size={16} />
      <span>Retour à la liste</span>
    </a>
  </div>

  <!-- Form -->
  <SponsorForm mode="edit" {sponsorId} />
</div>