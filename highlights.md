---
title: "Research Highlights"
gallery:
---

<div style="display:flex; justify-content:center; align-items:center; gap:2rem; width:100%;">
  <!-- Left: hover image -->
  <div style="flex:0 0 48%; display:flex; justify-content:center; align-items:center; position:relative;">
    <img src="/assets/images/nn.png" style="width:100%; max-height:500px; object-fit:contain; transition:0.3s;">
    <div style="
      position:absolute; top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.5);
      color:white;
      display:flex;
      align-items:center;
      justify-content:center;
      opacity:0;
      transition:0.3s;
      text-align:center;
      padding:0.5rem;
    ">
      Data Science and Machine Learning: Neural network interatomic potentials for fast and accurate molecular dynamics simulations.
    </div>
  </div>

  <!-- Right: GIF or Video (optional hover as well) -->
  <div style="flex:0 0 48%; display:flex; justify-content:center; align-items:center; position:relative;">
    <img src="/assets/images/tb_an.gif" style="width:100%; max-height:500px; object-fit:contain; transition:0.3s;">
    <div style="
      position:absolute; top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.5);
      color:white;
      display:flex;
      align-items:center;
      justify-content:center;
      opacity:0;
      transition:0.3s;
      text-align:center;
      padding:0.5rem;
    ">
      Theoretical Spectroscopy Calculation: 2-dimensional electronic spectroscopy calculated from molecular dynamics simulations.
    </div>
  </div>
</div>

<div style="display:flex; justify-content:center; align-items:center; gap:2rem; width:100%;">
  <!-- Left: hover image -->
  <div style="flex:0 0 48%; display:flex; justify-content:center; align-items:center; position:relative;">
    <img src="/assets/images/dielec_reac.gif" style="width:100%; max-height:500px; object-fit:contain; transition:0.3s;">
    <div style="
      position:absolute; top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.5);
      color:white;
      display:flex;
      align-items:center;
      justify-content:center;
      opacity:0;
      transition:0.3s;
      text-align:center;
      padding:0.5rem;
    ">
      Molecular Dynamics Simulation: Ab initio reaction dynamics with explicit solvent.
    </div>
  </div>

  <!-- Right: GIF or Video (optional hover as well) -->
  <div style="flex:0 0 48%; display:flex; justify-content:center; align-items:center; position:relative;">
    <img src="/assets/images/alchemical.png" style="width:100%; max-height:500px; object-fit:contain; transition:0.3s;">
    <div style="
      position:absolute; top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.5);
      color:white;
      display:flex;
      align-items:center;
      justify-content:center;
      opacity:0;
      transition:0.3s;
      text-align:center;
      padding:0.5rem;
    ">
      Statistical Mechanics and Thermodynamics: Alchemical simulation for free energy methods.
    </div>
  </div>
</div>

<script>
const containers = document.querySelectorAll('[style*="position:relative"]');
containers.forEach(c => {
  const img = c.querySelector('img');
  const overlay = c.querySelector('div');
  c.addEventListener('mouseenter', () => img.style.opacity = 0.7);
  c.addEventListener('mouseleave', () => img.style.opacity = 1);
  c.addEventListener('mouseenter', () => overlay.style.opacity = 1);
  c.addEventListener('mouseleave', () => overlay.style.opacity = 0);
});
</script>


